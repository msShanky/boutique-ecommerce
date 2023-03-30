import React, { FunctionComponent, MouseEvent } from "react";
import Link from "next/link";
import { ActionIcon, Title, Image } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconHeart } from "@tabler/icons";
import { getImageUrl, getProductSlug } from "@/helpers/supabase-helper";
import { PriceWithDiscount } from "@/components/feature/product/PriceWithDiscount";

type FeaturedProductCardProps = {
	product: ProductWithRelations;
	handleWishList: () => void;
	isActive?: boolean;
	isWishlisted?: boolean;
};

export const FeaturedProductCard: FunctionComponent<FeaturedProductCardProps> = (props) => {
	const { product, handleWishList, isWishlisted } = props;
	const { id, images, title } = product;

	const _handleWishList = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		handleWishList();
	};

	const pageSlug = getProductSlug(product);

	return (
		<Link href={pageSlug} passHref>
			<div className="relative w-[344px] h-[620px] hover:cursor-pointer group mb-4">
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
				{/* TODO: Fetch the wishlist status from the API call */}
				<div className="absolute flex flex-row space-x-4 top-2 left-2">
					<ActionIcon className="hover:bg-transparent " onClick={_handleWishList}>
						<IconHeart className={`${isWishlisted ? "fill-pink" : "fill-transparent"} stroke-pink`} size={40} />
					</ActionIcon>
				</div>
				<div className="mt-4 space-y-2 bg-white">
					<Title className="font-sans text-xl text-dark-blue cla">{title}</Title>
				</div>
				<PriceWithDiscount product={product} />
			</div>
		</Link>
	);
};
