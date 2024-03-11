export const handleProductRedirection = (product: ProductWithRelations) => {
	const { gender_group, category, page_link } = product;

	if (!page_link) return;

	const productSlug = `/shop/${gender_group?.gender?.toLowerCase()}/${category?.page_link?.split("/")[1]}/${page_link}`;

	return productSlug;
};
