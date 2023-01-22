import { MouseEvent, useEffect, useState } from "react";
import type { NextPage, InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { AppLayout } from "@/components/layout";
import { Loader, Title } from "@mantine/core";
import { User } from "@supabase/supabase-js";
import { supabaseClient, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { WishListCard } from "@/components/feature";
import {  useLazyGetUserWishlistQuery } from "@/reducer/breezeBaseApi";
// import { getUser, withPageAuth } from "@supabase/auth-helpers-nextjs";

type WishListProps = {
	user: User;
};

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const WishListPage: NextPage<PageProps> = (props) => {
	const { user } = props;
	const router = useRouter();
	const [isLoading, setLoading] = useState(false);
	const [getUserWishlist, userWishlistResponse] = useLazyGetUserWishlistQuery()
	const [wishlistProducts, setWishListProducts] = useState<Array<UserWishListItem> | null>();

	useEffect(()=>{
		if (userWishlistResponse.status === 'fulfilled' && userWishlistResponse?.data?.body) {
			setLoading(false);
			setWishListProducts(userWishlistResponse.data.body)
		}
	},[userWishlistResponse])

	useEffect(() => {
		if (user?.id) {
			setLoading(true);
			getUserWishlist(user.id)
		}
	}, [getUserWishlist, user.id]);

	const handleAddToCart = (event: MouseEvent<HTMLButtonElement>, product: ProductWithRelations) => {
		// TODO: [2] Handle Variant selection before adding the product to cart
		console.log("ADD PRODUCT TO CART", event, product);
		event.preventDefault();
		event.stopPropagation();
	};

	const handleProductRedirection = (product: ProductWithRelations) => {
		const { code, category } = product;
		const productCategory = category?.category ? category?.category.toLowerCase() : null;
		if (!productCategory) return;
		const productRoute = `/products/${productCategory}/${code}`;
		router.push(productRoute);
	};

	return (
		<AppLayout menuLinks={[]}>
			<>
				<Head>
					<title>Breeze Boutique | WishList</title>
				</Head>
				<main className="container flex flex-col min-h-screen gap-10 mx-auto my-20">
					<Title className="text-xl font-bold text-violet" order={1}>
						My Wishlist
					</Title>
					{isLoading && (
						<div className="flex justify-center w-full h-56 mt-20">
							<Loader size={60} />
						</div>
					)}
					{wishlistProducts && wishlistProducts.length > 0 && (
						<section className="container flex flex-wrap gap-10 mx-auto">
							{wishlistProducts.map((wishlistItem) => {
								const { product } = wishlistItem;
								return (
									<WishListCard
										key={`${wishlistItem.id}_WISHLIST_ITEM`}
										handleProductRedirection={() => handleProductRedirection(product)}
										handleAddToCart={(event) => handleAddToCart(event, product)}
										product={product}
									/>
								);
							})}
						</section>
					)}
				</main>
			</>
		</AppLayout>
	);
};

export default WishListPage;

export const getServerSideProps = withPageAuth({ redirectTo: "/login" });
