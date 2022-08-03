import { Breadcrumbs, Button, Divider, Image, Loader, Text, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Heart, ShoppingCart } from "tabler-icons-react";
import { useAppDispatch } from "../../../app/hooks";
import AppLayout from "../../../components/layout/AppLayout";
import { useGetProductsByCodeQuery } from "../../../reducer/breezeBaseApi";
import { addProductToCart } from "../../../reducer/cart";
// import { addProduct } from "../../../reducer/cart";
import { definitions } from "../../../types/supabase";

const breadcrumbs = [
	{ link: "/", label: "Home" },
	{ link: "/products", label: "Categories" },
];

const Product: NextPage = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [selectedVariant, setVariant] = useState<definitions["product_variant"]>();
	const [cartErrorState, setCartErrorState] = useState<boolean>(false);

	const { category, product_id } = router.query;

	const { isLoading, data, isSuccess } = useGetProductsByCodeQuery({
		categoryName: category as string,
		productCode: product_id as string,
	});

	const product = data?.body[0];

	const _mrp = product?.msrp as number;
	const discountPrice = _mrp * ((product?.product_discount as number) / 100);
	const productPrice = _mrp - parseInt(discountPrice?.toFixed(), 10);

	const handleVariantSelection = (variant: definitions["product_variant"]) => {
		setVariant(variant);
		setCartErrorState(false);
	};

	const handleAddToCart = () => {
		console.log("The product that should be added to cart", product);
		if (!selectedVariant) {
			setCartErrorState(true);
			return;
		} else {
			setCartErrorState(false);
		}
		dispatch(addProductToCart({ product: product as ProductWithRelations, variant: selectedVariant }));
		showNotification({
			title: "Added Product",
			message: `${product?.title} has been added, and size selected is ${selectedVariant.size}`,
		});
	};

	return (
		<AppLayout>
			<>
				<Head>
					<title>Breeze Boutique | Product</title>
				</Head>
				{isLoading && (
					<div className="flex justify-center w-full h-56 mt-20">
						<Loader size={60} />
					</div>
				)}
				{isSuccess && (
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
							<div className="flex items-center mt-8 space-x-4">
								<Text className="font-sans text-2xl text-page">Rs. {productPrice}</Text>
								<Text className="font-sans text-xl line-through text-pink">Rs. {product?.msrp}</Text>
								<Text className="font-sans text-xl text-violet">{`(${product?.product_discount}% OFF)`}</Text>
							</div>
							{/* Variant Section */}
							<div className="flex flex-col mt-8 space-y-4">
								<Text className="font-sans text-lg font-semibold uppercase text-dark-blue">Select Size:</Text>
								<div className={`flex mt-8 space-x-4 animate-pulse`}>
									{/* <div className={`flex mt-8 space-x-4 ${cartErrorState ? "animate-pulse" : ""}`}> */}
									{product?.variants?.map((variant) => {
										const variantKey = `variant_key_${variant.id}`;
										const isSelected = selectedVariant?.id === variant.id;
										return (
											<Button
												key={variantKey}
												onClick={() => handleVariantSelection(variant)}
												className={`rounded-full w-14 h-14 border-pink  hover:bg-pink hover:text-white ${
													isSelected ? "bg-pink text-white" : "text-pink"
												}`}
											>
												{variant.size}
											</Button>
										);
									})}
								</div>
								{cartErrorState && <p className="font-sans text-red-600">Please select a size</p>}
							</div>
							{/* Button Section */}
							<div className="flex justify-between w-full mt-12">
								<Button
									classNames={{ label: "space-x-2" }}
									className="flex justify-center w-64 h-12 items-top bg-pink hover:bg-opacity-80 hover:bg-pink"
									onClick={handleAddToCart}
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
				)}
			</>
		</AppLayout>
	);
};

export default Product;
