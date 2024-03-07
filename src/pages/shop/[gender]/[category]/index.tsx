import React, { useState } from "react";
import { useRouter } from "next/router";
import { AppLayout } from "@/components/layout";
import { GetStaticPropsContext, NextPage } from "next";
import { Title, Pagination } from "@mantine/core";
import { getCategoryMenuLinks } from "@/helpers/static_builder";
import { ProductCard } from "@/components/feature";
import { useWishlist } from "hooks";
import { useUser } from "@supabase/auth-helpers-react";
import { getCategoriesForPage, getSubCategoriesAndProductsForCategory } from "@/helpers/static_builder/categoryPage";
import { CategoryFilterFacet } from "@/components/feature/filters";
import { getProductSlug } from "@/helpers/supabase-helper";

type GenderGroupPageProps = {
	menuLinks: Array<MenuLinkPropTypes>;
	categoryProps: CategoryPageProps;
};

const PAGE_ITEMS = 8;

const GenderGroupPage: NextPage<GenderGroupPageProps> = (props) => {
	const { menuLinks, categoryProps } = props;
	const router = useRouter();
	const { category, products, subCategories } = categoryProps;
	const { user } = useUser();
	// const [currentPage, setCurrentPage] = useState(1);
	const { wishlist, handleWishlist } = useWishlist(user?.id);

	const handleProductRedirection = (product: ProductWithRelations) => {
		const { gender_group, category, page_link } = product;
		if (!page_link) return;
		const productSlug = `/shop/${gender_group?.gender?.toLowerCase()}/${
			category?.page_link?.split("/")[1]
		}/${page_link}`;
		router.push(productSlug);
	};

	return (
		<AppLayout pageTitle="Breeze Boutique | Gender Listing" menuLinks={menuLinks}>
			{/* TODO: Get all products for the gender group */}
			<main className="container flex flex-col items-center justify-center gap-4 mx-auto mt-10">
				{products.length <= 0 ? (
					<h2 className="min-h-screen mt-10 text-4xl font-extralight">
						There are no products available for {category.category}
					</h2>
				) : (
					<section className="justify-between w-full mb-20">
						<Title className="flex justify-start ml-4 font-sans text-3xl text-black capitalize md:text-5xl font-extralight">
							{category.category} for {category.gender_group.gender}
						</Title>
						<section className="flex flex-col w-full gap-10 mt-10 lg:flex-row">
							<div className="container flex flex-wrap lg:justify-start justify-center w-full gap-10 mx-auto mb-20 min-h-[60vh] px-4">
								{products.map((product) => {
									const isWishlisted = wishlist.includes(product.id);
									return (
										<ProductCard
											// handleProductRedirection={() => handleProductRedirection(product)}
											handleWishList={() => handleWishlist(product)}
											product={product}
											isWishlisted={isWishlisted}
											key={product.page_link}
											productLink={getProductSlug(product)}
										/>
									);
								})}
							</div>
						</section>
					</section>
				)}
			</main>
		</AppLayout>
	);
};

export default GenderGroupPage;

// Generates `/shop/men/[category1]`, `/shop/women/[category1]` and `/shop/kids/[category1]`
export async function getStaticPaths() {
	const categories = await getCategoriesForPage();
	const categoryPaths = categories?.map((categoriesInfo) => {
		return {
			params: {
				gender: categoriesInfo.gender_group.gender?.toLowerCase(),
				category: categoriesInfo.page_link?.split("/")[1],
			},
		};
	});

	return {
		paths: categoryPaths,
		fallback: false,
	};
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: GetStaticPropsContext) {
	const menuLinkResponse = await getCategoryMenuLinks();
	if (!context?.params?.gender) return null;

	const categoryProps = await getSubCategoriesAndProductsForCategory(context?.params?.category as string);
	return {
		// Passed to the page component as props
		props: { menuLinks: menuLinkResponse, categoryProps },
	};
}
