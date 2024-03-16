import { EmblaCarousel } from "@/components/common/carousal";
import React, { FC } from "react";

type ProductDetailsImageProps = {
	product: ProductWithRelations;
};

export const ProductDetailsImage: FC<ProductDetailsImageProps> = ({ product }) => {
	const { images } = product;

	if (!images || images?.length <= 0) return null;

	return <EmblaCarousel slides={images} />;
};
