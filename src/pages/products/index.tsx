import { Breadcrumbs, Loader, Title } from "@mantine/core";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import ProductCategoryCard from "../../components/feature/product/ProductCategoryCard";
import AppLayout from "../../components/layout/AppLayout";
import { useGetProductCategoriesQuery } from "../../reducer/breezeBaseApi";
import { definitions } from "../../types/supabase";

// const breadcrumbs = [
// 	{ link: "/", label: "Home" },
// 	{ link: "/products", label: "Categories" },
// ];

const Product: NextPage = () => {
	const router = useRouter();

	const { isLoading, data, isSuccess } = useGetProductCategoriesQuery();

	const handleCategoryRedirection = (category: definitions["product_category"]) => {
		const categoryRoute = `/products/${category.category?.toLowerCase()}`;
		router.push(categoryRoute);
	};

	return (
		<AppLayout>
			<>
				<Head>
					<title>Breeze Boutique | Products</title>
				</Head>
				{/* <section className="flex w-full h-72 bg-violet-light">
					<div className="container flex flex-col justify-center mx-auto space-y-4">
						<Title className="font-serif font-bold text-dark-blue">Product Categories</Title>
						<Breadcrumbs
							separator={<span className="w-1 h-1 mb-1 rounded-full bg-pink" />}
							className="flex items-end font-sans"
							classNames={{
								root: " text-dark-blue",
								breadcrumb: "last:text-pink hover:text-violet",
							}}
						>
							{breadcrumbs.map((crumb, key) => {
								return (
									<span key={`BREAD_CRUMB_${key}`}>
										<Link href={crumb.link} passHref>
											{crumb.label}
										</Link>
									</span>
								);
							})}
						</Breadcrumbs>
					</div>
				</section> */}
				{isLoading && (
					<div className="flex justify-center w-full h-56">
						<Loader size={60} />
					</div>
				)}
				{isSuccess && (
					<section className="container flex flex-wrap gap-10 mx-auto my-20">
						{data?.body.map((categoryData, index) => {
							return (
								<ProductCategoryCard
									handleCardClick={() => handleCategoryRedirection(categoryData)}
									key={`CATEGORY_INDEX_${index + 15}`}
									categoryProp={categoryData}
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
