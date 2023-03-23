import React, { FC } from "react";

import { Text } from "@mantine/core";
import { getSellingPrice } from "@/helpers/price-calculator";

type PriceWithDiscountTypes = {
	product: ProductWithRelations;
};

export const PriceWithDiscount: FC<PriceWithDiscountTypes> = (props) => {
	const { product } = props;

	const { msrp, product_discount } = product;

	return (
		<div className="flex items-center mt-6 space-x-4">
			<Text className="font-sans text-base text-primaryBlack">Rs. {getSellingPrice(product)}</Text>
			<Text className="font-sans text-sm line-through text-primary">Rs. {msrp}</Text>
			{product_discount && <Text className="font-sans text-sm text-success">{`(${product_discount}% OFF)`}</Text>}
		</div>
	);
};
