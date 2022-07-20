import { ActionIcon, Card, Image, Text, Title } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import React, { FunctionComponent, useState } from "react";
import { Heart } from "tabler-icons-react";

type ProductCardProps = {
	product: ProductWithRelations;
	handleAddToCart: (selectedSize: string) => void;
	handleWishList: () => void;
};

const ProductCard: FunctionComponent<ProductCardProps> = (props) => {
	const { hovered, ref } = useHover();
	const { id, images, msrp, title, sub_title, variants } = props.product;

	return (
		<Card ref={ref} className="relative shadow-lg w-72 hover:cursor-pointer group">
			<Card.Section className="h-64 bg-violet-light">
				<Image
					height={256}
					classNames={{
						image: "object-top",
					}}
					src={images ? (images[0] as string) : ""}
					alt={`PRODUCT_${id}`}
					fit="cover"
				/>
			</Card.Section>
			<div className="absolute flex flex-row space-x-4 top-2 left-2">
				<ActionIcon className="hover:bg-transparent " onClick={() => console.log("Handle Product Wish listing")}>
					<Heart className="active:fill-pink stroke-pink" size={40} />
				</ActionIcon>
			</div>
			<div className="h-20 mt-4 space-y-2 bg-white">
				{hovered ? (
					<>
						<Title className="font-sans text-xl text-dark-blue">Available Sizes:</Title>
						<div className="flex flex-row flex-wrap space-x-2 ">
							{variants.map((variant, index) => {
								const variantKey = `product_variant_${index + 556}`;
								return (
									<Text key={variantKey} className="font-sans text-sm text-violet-subtext">
										{variant.size}
									</Text>
								);
							})}
						</div>
					</>
				) : (
					<>
						<Title className="font-sans text-xl text-dark-blue">{title}</Title>
						<Text className="font-sans text-sm text-violet-subtext">{sub_title}</Text>
					</>
				)}
			</div>
			<div className="flex mt-6 space-x-4">
				<Text className="font-sans text-base text-page">Rs. {msrp ? (msrp as number) - 600 : msrp}</Text>
				<Text className="font-sans text-sm line-through text-pink">Rs. {msrp}</Text>
				<Text className="font-sans text-sm text-violet">(79% OFF)</Text>
			</div>
		</Card>
	);
};

export default ProductCard;
