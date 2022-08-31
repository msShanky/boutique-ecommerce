import { Loader } from "@mantine/core";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import ProductCard from "../../../components/feature/product/ProductCard";
import AppLayout from "../../../components/layout/AppLayout";
import { useGetProductsByCategoryNameQuery } from "../../../reducer/breezeBaseApi";

const Product: NextPage = () => {
	const router = useRouter();
	const { user } = useUser();
	const { category } = router.query;
	const { isLoading, data, isSuccess } = useGetProductsByCategoryNameQuery(category as string);

	const handleProductRedirection = (product: ProductWithRelations) => {
		const productRoute = product.code;
		router.push(`${router.asPath}/${productRoute}`);
	};

	const handleWishList = async (product: ProductWithRelations) => {
		if (!user) return;
		// TODO: Handle the loader for the user_wishlist
		const postBody = { product_id: product.id, user_id: user.id };
		const { data } = await supabaseClient.from("user_wishlist").insert([postBody]);
	};

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
								return (
									<ProductCard
										handleProductRedirection={() => handleProductRedirection(product)}
										handleWishList={() => handleWishList(product)}
										product={product}
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
