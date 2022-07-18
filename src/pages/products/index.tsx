import { Breadcrumbs, Title } from "@mantine/core";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useAppDispatch } from "../../app/hooks";
import ProductCard from "../../components/feature/product/ProductCard";
import AppLayout from "../../components/layout/AppLayout";
import { useGetProductCategoriesQuery } from "../../reducer/breezeBaseApi";
import { addProduct } from "../../reducer/cart";

const products = [
	{ id: 1, image: "/images/products/product_1.jpeg", price: 999, size: ["4xl"] },
	{ id: 2, image: "/images/products/product_2.jpeg", price: 599, size: ["S", "L", "M", "XL", "XXL"] },
	{ id: 3, image: "/images/products/product_3.jpeg", price: 450, size: ["S", "L", "M", "XL", "XXL"] },
	{ id: 4, image: "/images/products/product_4.jpeg", price: 450, size: ["S", "L", "M", "XL", "XXL"] },
	{ id: 5, image: "/images/products/product_5.jpeg", price: 450, size: ["S", "L", "M", "XL", "XXL"] },
	{ id: 6, image: "/images/products/product_6.jpeg", price: 450, size: ["S", "L", "M", "XL", "XXL"] },
	{ id: 7, image: "/images/products/product_7.jpeg", price: 450, size: ["S", "L", "M", "XL", "XXL"] },
];

const breadcrumbs = [
	{ link: "/", label: "Home" },
	{ link: "/products", label: "Categories" },
];

const Product: NextPage = () => {
	const dispatch = useAppDispatch();

	const { isLoading, data, error } = useGetProductCategoriesQuery();

	const handleProductAdd = (product: SelectedProduct) => {
		dispatch(addProduct(product));
	};

	console.log("the response from the api for category", data);

	return (
		<AppLayout>
			<>
				<Head>
					<title>Breeze Boutique | Products</title>
				</Head>
				<section className="flex w-full h-72 bg-violet-light">
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
				</section>
				<section className="container flex flex-wrap gap-10 mx-auto mt-20">
					{data?.body.map((categoryData, index) => {
						const { category } = categoryData;
						return <h1 key={`CATEGORY_INDEX_${index + 15}`}>{category}</h1>;
					})}
					{/* {data.body.map((product) => {
						return (
							<ProductCard
								handleAddToCart={(selectedSize) => handleProductAdd({ ...product, selectedSize })}
								handleWishList={() => {}}
								product={product}
								key={product.id}
							/>
						);
					})} */}
				</section>
			</>
		</AppLayout>
	);
};

export default Product;
