import { Breadcrumbs, Title } from "@mantine/core";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
// import { useEffect } from "react";
import { useAppDispatch } from "../../../app/hooks";
import ProductCard from "../../../components/feature/product/ProductCard";
import AppLayout from "../../../components/layout/AppLayout";
import { useGetProductsByCategoryNameQuery } from "../../../reducer/breezeBaseApi";

const breadcrumbs = [
	{ link: "/", label: "Home" },
	{ link: "/products", label: "Categories" },
];

const Product: NextPage = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { category } = router.query;

	// useEffect(() => {
	// 	if (!categoryId) {
	// 		router.push("/products");
	// 	}
	// }, [categoryId, router]);

	// useEffect(() => {
	// 	const categoryRoute = `/${category}`;
	// 	const isExisting = breadcrumbs.some((crumb) => crumb.link === categoryRoute);
	// 	console.log("The category breadcrumb is ", categoryRoute, isExisting);
	// 	if (!isExisting) {
	// 		breadcrumbs.push({ link: categoryRoute, label: category as string });
	// 	}
	// }, [category]);

	const { isLoading, data, error } = useGetProductsByCategoryNameQuery(category as string);

	const handleProductRedirection = (product: ProductWithRelations) => {
		const productRoute = product.code;
		router.push(`${router.asPath}/${productRoute}`);
	};

	return (
		<AppLayout>
			<>
				<Head>
					<title>Breeze Boutique | Products</title>
				</Head>
				<section className="flex w-full h-72 bg-violet-light">
					<div className="container flex flex-col justify-center mx-auto space-y-4">
						<Title className="font-serif font-bold text-dark-blue">{category}</Title>
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
				</section>
				<section className="container flex flex-wrap gap-10 mx-auto my-20">
					{data?.body &&
						data?.body.map((product) => {
							return (
								<ProductCard
									handleProductRedirection={() => handleProductRedirection(product)}
									handleWishList={() => {}}
									product={product}
									key={product.id}
								/>
							);
						})}
				</section>
			</>
		</AppLayout>
	);
};

export default Product;
