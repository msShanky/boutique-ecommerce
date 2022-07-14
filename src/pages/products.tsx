import { Title } from "@mantine/core";
import type { NextPage } from "next";
import Head from "next/head";
import { useAppDispatch } from "../app/hooks";
import ProductCard from "../components/feature/product/ProductCard";
import AppLayout from "../components/layout/AppLayout";
import { addProduct } from "../reducer/cart";

const products = [
	{ id: 1, image: "/images/products/product_1.jpeg", price: 999, size: ["4xl"] },
	{ id: 2, image: "/images/products/product_2.jpeg", price: 599, size: ["S", "L", "M", "XL", "XXL"] },
	{ id: 3, image: "/images/products/product_3.jpeg", price: 450, size: ["S", "L", "M", "XL", "XXL"] },
	{ id: 4, image: "/images/products/product_4.jpeg", price: 450, size: ["S", "L", "M", "XL", "XXL"] },
	{ id: 5, image: "/images/products/product_5.jpeg", price: 450, size: ["S", "L", "M", "XL", "XXL"] },
	{ id: 6, image: "/images/products/product_6.jpeg", price: 450, size: ["S", "L", "M", "XL", "XXL"] },
	{ id: 7, image: "/images/products/product_7.jpeg", price: 450, size: ["S", "L", "M", "XL", "XXL"] },
];

const Product: NextPage = () => {
	const dispatch = useAppDispatch();

	const handleProductAdd = (product: SelectedProduct) => {
		dispatch(addProduct(product));
	};

	return (
		<AppLayout>
			<>
				<Head>
					<title>Breeze Boutique | Products</title>
				</Head>
				<section className="flex w-full h-72 bg-violet-light">
					<div className="container flex flex-col justify-center mx-auto">
						<Title>Products</Title>
					</div>
				</section>
				<section className="container flex flex-wrap gap-10 mx-auto mt-20">
					{products.map((product) => {
						return (
							<ProductCard
								handleAddToCart={(selectedSize) => handleProductAdd({ ...product, selectedSize })}
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
