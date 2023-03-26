import { ActionIcon, Card, Image, Text, Title } from "@mantine/core";
import { useHover, useViewportSize } from "@mantine/hooks";
import React, { FunctionComponent, MouseEvent } from "react";
import { IconHeart } from "@tabler/icons";
import { getImageUrl } from "helpers/supabase-helper";
import { getSellingPrice } from "helpers/price-calculator";
import Link from "next/link";
import { PriceWithDiscount } from "./PriceWithDiscount";

type ProductCardProps = {
	product: ProductWithRelations;
	// handleProductRedirection: () => void;
	handleWishList: () => void;
	isActive?: boolean;
	isWishlisted?: boolean;
	productLink: string;
};

//  TODO: [3] [Accessibility] featured products does not display link when hovered */
const ProductCard: FunctionComponent<ProductCardProps> = (props) => {
	const { hovered, ref } = useHover();
	const { width } = useViewportSize();
	const { product, handleWishList, isWishlisted, productLink } = props;
	const { id, images, title, sub_title, variants } = product;

	const _handleWishList = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		handleWishList();
	};

	const desktopTitleRender = () => {
		if (hovered) {
			return (
				<div className="h-20 mt-4 space-y-2 bg-white">
					<Title className="font-sans text-xl text-dark-blue">Available Sizes:</Title>
					<div className="flex flex-row flex-wrap space-x-2 ">
						{variants &&
							variants.map((variant, index) => {
								const variantKey = `product_variant_${index + 556}`;
								return variant.inventory_count ? (
									<Text key={variantKey} className="font-sans text-sm uppercase text-violet-subtext">
										{variant.size}
									</Text>
								) : (
									""
								);
							})}
					</div>
				</div>
			);
		}
		return (
			<div className="h-20 mt-4 space-y-2 bg-white">
				<Title className="font-sans text-xl text-dark-blue">{title}</Title>
				<Text className="font-sans text-sm text-violet-subtext">{sub_title}</Text>
			</div>
		);
	};

	const mobileTitleRender = () => {
		return (
			<div className="mt-4 space-y-2 bg-white h-28">
				<Title className="font-sans text-xl text-dark-blue">{title}</Title>
				<Text className="font-sans text-sm text-violet-subtext">{sub_title}</Text>
				<Title className="font-sans text-sm text-dark-blue">Available Sizes:</Title>
				<div className="flex flex-row flex-wrap space-x-2 ">
					{variants &&
						variants.map((variant, index) => {
							const variantKey = `product_variant_${index + 556}`;
							return variant.inventory_count ? (
								<Text key={variantKey} className="font-sans text-xs uppercase text-violet-subtext">
									{variant.size}
								</Text>
							) : (
								""
							);
						})}
				</div>
			</div>
		);
	};

	if (!productLink) return null;

	return (
		<Link passHref href={productLink}>
			<Card ref={ref} className="relative shadow-lg w-72 hover:cursor-pointer group">
				<Card.Section className="h-64 bg-violet-light">
					<Image
						height={256}
						classNames={{
							image: "object-top",
						}}
						src={images ? getImageUrl(images?.[0]) : ""}
						alt={`PRODUCT_${id}`}
						fit="cover"
					/>
				</Card.Section>
				{/* TODO: Fetch the wishlist status from the API call */}
				{/* <div className="absolute flex flex-row space-x-4 top-2 left-2"> */}
				<div className="absolute flex flex-row space-x-4 top-2">
					<ActionIcon className="hover:bg-transparent " onClick={_handleWishList}>
						<IconHeart className={`${isWishlisted ? "fill-pink" : "fill-transparent"} stroke-pink`} size={40} />
					</ActionIcon>
				</div>
				{width < 650 ? mobileTitleRender() : desktopTitleRender()}
				<PriceWithDiscount product={product} />
			</Card>
		</Link>
	);
};

export default ProductCard;
