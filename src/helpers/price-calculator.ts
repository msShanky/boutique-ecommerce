export const getSellingPrice = (product: ProductWithRelations): number => {
	const { msrp, product_discount } = product;
	const _mrp = msrp as number;
	const discountPrice = _mrp * ((product_discount as number) / 100);
	const productPrice = _mrp - parseInt(discountPrice?.toFixed(), 10);
	return productPrice;
};
