import React, { useState } from "react";
import { useRouter } from "next/router";
import { AppLayout } from "@/components/layout";
import { GetStaticPropsContext, NextPage } from "next";
import { Title, Image, Text, Pagination } from "@mantine/core";
import {
	getGenderGroupPages,
	getCategoryMenuLinks,
	getCategoriesAndProductsForGenderGroup,
} from "@/helpers/static_builder";
import { CategoryListing } from "@/components/feature/pages";
import { ProductCard } from "@/components/feature";
import { useWishlist } from "hooks";
import { useUser } from "@supabase/auth-helpers-react";

type GenderGroupPageProps = {
	menuLinks: Array<MenuLinkPropTypes>;
	genderProps: GenderGroupPage;
};

const PAGE_ITEMS = 8;

const GenderGroupPage: NextPage<GenderGroupPageProps> = (props) => {
	const { menuLinks, genderProps } = props;
	const { categories, products, gender } = genderProps;
	const { user } = useUser();
	const router = useRouter();
	const [currentPage, setCurrentPage] = useState(1);
	const { wishlist, handleWishlist } = useWishlist(user?.id);

	const handleProductRedirection = (product: ProductWithRelations) => {
		const { gender_group, category, page_link } = product;

		if (!page_link) return;

		const productSlug = `/shop/${gender_group?.gender?.toLowerCase()}/${
			category?.page_link?.split("/")[1]
		}/${page_link}`;

		router.push(productSlug);
	};

	const maxPages = Math.ceil((parseInt(`${products?.length}`) || 0) / PAGE_ITEMS);

	return (
		<AppLayout pageTitle="Breeze Boutique | Gender Listing" menuLinks={menuLinks}>
			{/* TODO: Get all products for the gender group */}
			<section className="container flex flex-col items-center justify-center gap-4 mx-auto mt-10">
				{categories.length > 0 && (
					<Title className="font-sans text-2xl md:text-3xl text-primaryBlack font-extralight">
						Categories for {gender.gender}
					</Title>
				)}
				<CategoryListing items={categories} />
				{products.length <= 0 ? (
					<h2 className="min-h-screen mt-10 text-4xl font-extralight">
						There are no products available for {gender.gender}
					</h2>
				) : (
					<section className="justify-between w-full mt-10 mb-20">
						<Title className="flex justify-center font-sans text-5xl text-black capitalize">{gender.gender}</Title>
						{/* <section className="container flex flex-wrap justify-center w-full gap-10 mx-auto mt-10 mb-20 min-w-max"> */}
						<section className="container flex flex-wrap justify-center w-full gap-10 my-10">
							{products.map((product) => {
								const isWishlisted = wishlist.includes(product.id);
								return (
									<ProductCard
										handleProductRedirection={() => handleProductRedirection(product)}
										handleWishList={() => handleWishlist(product)}
										product={product}
										isWishlisted={isWishlisted}
										key={product.id}
									/>
								);
							})}
						</section>
						{/* <Pagination
							page={currentPage}
							onChange={setCurrentPage}
							total={maxPages}
							radius="xl"
							withEdges
							position="center"
							styles={() => ({
								item: {
									"&[data-active]": {
										backgroundColor: "#7E33E0",
									},
								},
							})}
						/> */}
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
