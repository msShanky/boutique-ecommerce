import React, { FunctionComponent, MouseEvent } from "react";
// import Image from "next/image";
import { ActionIcon, Card, Text, Title, Image } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconHeart } from "@tabler/icons";
import { getImageUrl } from "@/helpers/supabase-helper";
import { getSellingPrice } from "@/helpers/price-calculator";

type FeaturedProductCardProps = {
	product: ProductWithRelations;
	handleProductRedirection: () => void;
	handleWishList: () => void;
	isActive?: boolean;
	isWishlisted?: boolean;
};

export const FeaturedProductCard: FunctionComponent<FeaturedProductCardProps> = (props) => {
	const { hovered, ref } = useHover();
	const { handleProductRedirection, product, handleWishList, isActive, isWishlisted } = props;
	const { id, images, msrp, title, sub_title, variants, product_discount } = product;

	const _handleWishList = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		handleWishList();
	};

	return (
		<div
			onClick={handleProductRedirection}
			ref={ref}
			className="relative w-[344px] h-[620px] hover:cursor-pointer group mb-4 "
		>
			{/* <div className="bg-violet-light"> */}
			<Image
				width={344}
				height={500}
				classNames={{
					image: "object-top",
				}}
				src={images ? getImageUrl(images?.[0]) : ""}
				alt={`PRODUCT_${id}`}
				fit="cover"
			/>
			{/* </div> */}
			{/* TODO: Fetch the wishlist status from the API call */}
			<div className="absolute flex flex-row space-x-4 top-2 left-2">
				<ActionIcon className="hover:bg-transparent " onClick={_handleWishList}>
					<IconHeart className={`${isWishlisted ? "fill-pink" : "fill-transparent"} stroke-pink`} size={40} />
				</ActionIcon>
			</div>
			<div className="mt-4 space-y-2 bg-white">
				<Title className="font-sans text-xl text-dark-blue cla">{title}</Title>
			</div>
			<div className="flex items-center mt-6 space-x-4">
				<Text className="font-sans text-base text-primary">Rs. {getSellingPrice(product)}</Text>
				<Text className="font-sans text-sm line-through text-pink">Rs. {msrp}</Text>
				<Text className="font-sans text-sm text-primaryBlack">{`(${product_discount}% OFF)`}</Text>
			</div>
		</div>
	);
};
