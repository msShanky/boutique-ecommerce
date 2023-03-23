import React, { useState } from "react";
import { GetStaticPropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import { useWishlist } from "hooks";
import { AppLayout } from "@/components/layout";
import { Title } from "@mantine/core";
import {
	getGenderGroupPages,
	getCategoryMenuLinks,
	getCategoriesAndProductsForGenderGroup,
} from "@/helpers/static_builder";
import { CategoryLinkListing } from "@/components/feature/category";
import { ProductCard } from "@/components/feature";
import { useUser } from "@supabase/auth-helpers-react";
import { getProductSlug } from "@/helpers/supabase-helper";

type GenderGroupPageProps = {
	menuLinks: Array<MenuLinkPropTypes>;
	genderProps: GenderGroupPage;
};

// TODO: [2] [GoodToHave] Scroll to top to be displayed when user scrolls a path

const GenderGroupPage: NextPage<GenderGroupPageProps> = (props) => {
	const { menuLinks, genderProps } = props;
	const { categories, products, gender } = genderProps;
	const { user } = useUser();
	const { wishlist, handleWishlist } = useWishlist(user?.id);

	return (
		<AppLayout pageTitle="Breeze Boutique | Gender Listing" menuLinks={menuLinks}>
			<section className="container flex flex-col items-center justify-center gap-4 mx-auto mt-10">
				{categories.length > 0 && (
					<Title className="font-sans text-2xl md:text-3xl text-primaryBlack font-extralight">
						Categories for {gender.gender}
					</Title>
				)}
				<CategoryLinkListing items={categories} />
				{products.length <= 0 ? (
					<h2 className="min-h-screen mt-10 text-4xl font-extralight">
						There are no products available for {gender.gender}
					</h2>
				) : (
					<section className="justify-between w-full mt-10 mb-20">
						<Title className="flex justify-center font-sans text-2xl text-black capitalize lg:text-4xl font-extralight md:text-5xl">
							All products for {gender.gender}
						</Title>
						{/* <section className="container flex flex-wrap justify-center w-full gap-10 mx-auto mt-10 mb-20 min-w-max"> */}
						<section className="container flex flex-wrap justify-center w-full gap-10 my-10">
							{products.map((product) => {
								if (!product) return null;
								const isWishlisted = wishlist.includes(product.id);
								return (
									<ProductCard
										handleWishList={() => handleWishlist(product)}
										product={product}
										isWishlisted={isWishlisted}
										key={product.id}
										productLink={getProductSlug(product)}
									/>
								);
							})}
						</section>
					</section>
				)}
			</section>
		</AppLayout>
	);
};

export default GenderGroupPage;

// Generates `/shop/men`, `/shop/women` and `/shop/kids`
export async function getStaticPaths() {
	const genderGroups = await getGenderGroupPages();
	const genderPaths = genderGroups?.map((genderInfo) => {
		return { params: { gender: genderInfo.gender?.toLowerCase() } };
	});

	return {
		paths: genderPaths,
		fallback: false,
	};
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: GetStaticPropsContext) {
	const menuLinkResponse = await getCategoryMenuLinks();
	if (!context?.params?.gender) return null;
	const genderGroupProps = await getCategoriesAndProductsForGenderGroup(context?.params?.gender as string);
	return {
		// Passed to the page component as props
		props: { menuLinks: menuLinkResponse, genderProps: genderGroupProps },
	};
}
