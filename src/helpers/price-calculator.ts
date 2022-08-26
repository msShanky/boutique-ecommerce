export const getSellingPriceFromDiscount = (mrp: number, discount: number): number => {
	const discountPrice = mrp * ((discount as number) / 100);
	const productPrice = mrp - parseInt(discountPrice?.toFixed(), 10);
	return productPrice;
};

export const getSellingPrice = (product: ProductWithRelations): number => {
	const { msrp, product_discount } = product;
	return getSellingPriceFromDiscount(msrp as number, product_discount as number);
	// const _mrp = msrp as number;
	// const discountPrice = _mrp * ((product_discount as number) / 100);
	// const productPrice = _mrp - parseInt(discountPrice?.toFixed(), 10);
	// return productPrice;
};
