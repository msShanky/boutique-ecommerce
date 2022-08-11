import { MouseEvent, useEffect, useState } from "react";
import type { NextPage, InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { AppLayout } from "@/components/layout";
import { Loader, Title } from "@mantine/core";
import { User } from "@supabase/supabase-js";
import { supabaseClient, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { WishListCard } from "@/components/feature";
// import { getUser, withPageAuth } from "@supabase/auth-helpers-nextjs";

type WishListProps = {
	user: User;
};

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const WishListPage: NextPage<PageProps> = (props) => {
	const { user } = props;
	const router = useRouter();
	const [isLoading, setLoading] = useState(false);
	const [wishlistProducts, setWishListProducts] = useState<Array<UserWishListItem> | null>();

	const loadData = async () => {
		setLoading(true);
		const response = await supabaseClient.from("user_wishlist")
			.select(`id,user_id,product_id,product(id,code,images,category_id,msrp,title,sub_title,product_discount,
			category:category_id (id,category),
			variants: product_variant(id,sku,size))`);
		console.log("The data fetched for wishlist from user", response);
		setLoading(false);
		setWishListProducts(response.data);
	};

	useEffect(() => {
		if (user) {
			loadData();
		}
	}, [user]);

	const handleAddToCart = (event: MouseEvent<HTMLButtonElement>, product: ProductWithRelations) => {
		// TODO: Handle Variant selection before adding the product to cart
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

	console.log(" Wishlist Products ", wishlistProducts);

	return (
		<AppLayout>
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
								console.log(wishlistItem, "ITEM FOR WISH LIST CARD");
								const { product } = wishlistItem;
								// return <p >{wishlistItem.id}</p>;
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
