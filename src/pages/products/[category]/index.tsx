import { Loader } from "@mantine/core";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import ProductCard from "../../../components/feature/product/ProductCard";
import AppLayout from "../../../components/layout/AppLayout";
import { useGetProductsByCategoryNameQuery, useLazyGetUserWishlistQuery } from "../../../reducer/breezeBaseApi";

const Product: NextPage = () => {
	const router = useRouter();
	const { user } = useUser();
	const { category } = router.query;
	const { isLoading, data, isSuccess } = useGetProductsByCategoryNameQuery(category as string);
	const [getUserWishlist, userWishlistResponse] = useLazyGetUserWishlistQuery()
	const [userWishlist, setUserWishlist] = useState<number[]>([])

	const handleProductRedirection = (product: ProductWithRelations) => {
		const productRoute = product.code;
		router.push(`${router.asPath}/${productRoute}`);
	};

	const handleWishList = async (product: ProductWithRelations, isWishlisted: boolean) => {
		if (!user) return;
		// TODO: Handle the loader for the user_wishlist

		const supbaseWishlistClient = supabaseClient.from("user_wishlist")

		if(isWishlisted){
			await supbaseWishlistClient.delete().match({product_id: product.id})
		}
		else {
			const postBody = { product_id: product.id, user_id: user.id };
			await supbaseWishlistClient.insert([postBody]);
		}

		getUserWishlist(user.id)
	};

	useEffect(() => {
		if (userWishlistResponse.status === 'fulfilled' && userWishlistResponse?.data?.body) {
			const responseData = userWishlistResponse.data.body;
			const wishlistArray = responseData.length ? responseData.map((wishlist) => { return wishlist.product_id || 0 }) : []
			setUserWishlist(wishlistArray)
		}
	}, [userWishlistResponse])

	useEffect(() => {
		if (user?.id) {
			getUserWishlist(user.id)
		}
	}, [user?.id]);

	return (
		<AppLayout>
			<>
				<Head>
					<title>Breeze Boutique | Products</title>
				</Head>
				{isLoading && (
					<div className="flex justify-center w-full h-56 mt-20">
						<Loader size={60} />
					</div>
				)}
				{isSuccess && (
					<section className="container flex flex-wrap gap-10 mx-auto my-20">
						{data?.body &&
							data?.body.map((product) => {
								const isWishlisted = userWishlist.includes(product.id)
								return (
									<ProductCard
										handleProductRedirection={() => handleProductRedirection(product)}
										handleWishList={() => handleWishList(product, isWishlisted)}
										product={product}
										isWishlisted={isWishlisted}
										key={product.id}
									/>
								);
							})}
					</section>
				)}
			</>
		</AppLayout>
	);
};

export default Product;
