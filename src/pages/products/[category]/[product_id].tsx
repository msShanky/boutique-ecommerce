import { Breadcrumbs, Button, Divider, Image, Text, Title } from "@mantine/core";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Heart, ShoppingCart } from "tabler-icons-react";
import { useAppDispatch } from "../../../app/hooks";
import AppLayout from "../../../components/layout/AppLayout";
import { useGetProductsByCodeQuery } from "../../../reducer/breezeBaseApi";
import { addProduct } from "../../../reducer/cart";

// const products = [
// 	{ id: 1, image: "/images/products/product_1.jpeg", price: 999, size: ["4xl"] },
// 	{ id: 2, image: "/images/products/product_2.jpeg", price: 599, size: ["S", "L", "M", "XL", "XXL"] },
// 	{ id: 3, image: "/images/products/product_3.jpeg", price: 450, size: ["S", "L", "M", "XL", "XXL"] },
// 	{ id: 4, image: "/images/products/product_4.jpeg", price: 450, size: ["S", "L", "M", "XL", "XXL"] },
// 	{ id: 5, image: "/images/products/product_5.jpeg", price: 450, size: ["S", "L", "M", "XL", "XXL"] },
// 	{ id: 6, image: "/images/products/product_6.jpeg", price: 450, size: ["S", "L", "M", "XL", "XXL"] },
// 	{ id: 7, image: "/images/products/product_7.jpeg", price: 450, size: ["S", "L", "M", "XL", "XXL"] },
// ];

const breadcrumbs = [
	{ link: "/", label: "Home" },
	{ link: "/products", label: "Categories" },
];

const Product: NextPage = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const { category, product_id } = router.query;

	const { isLoading, data, error } = useGetProductsByCodeQuery({
		categoryName: category as string,
		productCode: product_id as string,
	});

	// const handleProductAdd = (product: SelectedProduct) => {
	// 	dispatch(addProduct(product));
	// };
	const product = data?.body[0];

	console.log("the response from the api for category", data?.body);

	return (
		<AppLayout>
			<>
				<Head>
					<title>Breeze Boutique | Product</title>
				</Head>
				<section className="flex w-full h-72 bg-violet-light">
					<div className="container flex flex-col justify-center mx-auto space-y-4">
						<Title className="font-serif font-bold text-dark-blue">Product Page</Title>
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
				<section className="container flex flex-wrap mx-auto my-20">
					<div className="w-8/12 p-1">
						<div className="relative flex flex-wrap gap-5 overflow-hidden ">
							{product?.images?.map((image, index) => {
								return (
									<Image
										className="w-[49%] object-top"
										height={680}
										radius="md"
										classNames={{
											imageWrapper: "overflow-hidden",
											image: "hover:scale-125 delay-75 transition-transform ease-in-out",
										}}
										key={`Product_image_${index + 5}`}
										src={image as string}
										alt={`product_image_${index + 1}`}
									/>
								);
							})}
						</div>
					</div>
					<div className="w-4/12 px-4 py-2">
						<Title order={1} className="font-sans text-4xl text-page">
							{product?.title}
						</Title>
						<Text className="mt-4 font-sans text-xl text-violet-subtext">{product?.sub_title}</Text>
						<Divider my="md" />
						{/* Price Section */}
						<div className="flex mt-8 space-x-4">
							<Text className="font-sans text-2xl text-page">
								Rs. {product?.msrp ? (product?.msrp as number) - 600 : product?.msrp}
							</Text>
							<Text className="font-sans text-xl line-through text-pink">Rs. {product?.msrp}</Text>
							<Text className="font-sans text-xl text-violet">(79% OFF)</Text>
						</div>
						{/* Variant Section */}
						<div className="flex flex-col mt-8 space-y-4">
							<Text className="font-sans text-lg font-semibold uppercase text-dark-blue">Select Size:</Text>
							<div className="flex mt-8 space-x-4">
								{product?.variants?.map((variant) => {
									const variantKey = `variant_key_${variant.id}`;
									return (
										<Button
											key={variantKey}
											className="rounded-full w-14 h-14 border-pink text-pink hover:bg-pink hover:text-white"
										>
											{variant.size}
										</Button>
									);
								})}
							</div>
						</div>
						{/* Button Section */}
						<div className="flex justify-between w-full mt-12">
							<Button
								classNames={{ label: "space-x-2" }}
								className="flex justify-center w-64 h-12 items-top bg-pink hover:bg-opacity-80 hover:bg-pink"
							>
								<div>
									<ShoppingCart size={20} />
								</div>
								<Text>Add To Cart</Text>
							</Button>
							<Button
								classNames={{ label: "space-x-2" }}
								className="w-48 h-12 border-2 border-violet text-violet hover:bg-transparent hover:border-black hover:text-black"
							>
								<div>
									<Heart size={20} />
								</div>
								<Text>Wishlist</Text>
							</Button>
						</div>
					</div>
				</section>
			</>
		</AppLayout>
	);
};

export default Product;
