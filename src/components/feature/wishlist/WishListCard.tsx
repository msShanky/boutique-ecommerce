import { Card, Image, Text, Title } from "@mantine/core";
import React, { FunctionComponent, MouseEvent } from "react";
import { Button } from "@mantine/core";
import { getImageUrl } from "helpers/supabase-helper";

type WishListCardProps = {
	product: ProductWithRelations;
	handleProductRedirection: () => void;
	handleAddToCart: (event: MouseEvent<HTMLButtonElement>) => void;
};

const WishListCard: FunctionComponent<WishListCardProps> = (props) => {
	const { handleProductRedirection, handleAddToCart, product } = props;
	const { id, images, msrp, title, sub_title, product_discount } = product;

	const _mrp = msrp as number;
	const discountPrice = _mrp * ((product_discount as number) / 100);
	const productPrice = _mrp - parseInt(discountPrice?.toFixed(), 10);

	return (
		<Card onClick={handleProductRedirection} className="relative shadow-lg w-72 hover:cursor-pointer group">
			<Card.Section className="h-[300px] bg-violet-light">
				<Image
					height={300}
					classNames={{
						image: "object-top",
					}}
					src={getImageUrl(images?.length ? (images[0] as string) : "")}
					alt={`PRODUCT_${id}`}
					fit="cover"
				/>
			</Card.Section>
			<div className="h-20 mt-4 space-y-2 bg-white">
				<>
					<Title className="font-sans text-xl text-dark-blue">{title}</Title>
					<Text className="font-sans text-sm text-violet-subtext">{sub_title}</Text>
				</>
			</div>
			<div className="flex items-center mt-6 space-x-2">
				<Text className="font-sans text-base text-page">Rs. {productPrice}</Text>
				<Text className="font-sans text-sm line-through text-pink">Rs. {msrp}</Text>
				<Text className="font-sans text-sm text-violet">{`(${product_discount}% OFF)`}</Text>
			</div>
			<div className="flex justify-center mt-4">
				<Button onClick={handleAddToCart} className="w-full border-pink text-pink hover:bg-pink hover:text-white">
					Add To Cart
				</Button>
			</div>
		</Card>
	);
};

export default WishListCard;
