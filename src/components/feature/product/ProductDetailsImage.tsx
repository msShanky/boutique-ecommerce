import { EmblaCarousel } from "@/components/common/carousal";
import { EmblaOptionsType } from "embla-carousel-react";
import React, { FC } from "react";

type ProductDetailsImageProps = {
	product: ProductWithRelations;
};

const OPTIONS: EmblaOptionsType = {
	loop: true,
};

export const ProductDetailsImage: FC<ProductDetailsImageProps> = ({ product }) => {
	const { images } = product;

	if (!images || images?.length <= 0) return null;

	return <EmblaCarousel slides={images} options={OPTIONS} />;
};
