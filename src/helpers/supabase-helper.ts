import { definitions } from "types/supabase";

type ProductCategorySelect = { value: string; label: string };

type GetCategoryDataInput = Array<definitions["product_category"]> | undefined;

export const getCategoryData = (categories: GetCategoryDataInput): Array<ProductCategorySelect> => {
	if (!categories) return [];
	return categories.map((category) => {
		return { value: category?.id.toString() ?? "", label: category?.category ?? "" };
	});
};

export const formatProductFormForUpdate = (
	product: Omit<ProductWithRelations, "id">
): Omit<definitions["product"], "id"> => {
	const { category, variants, ...coreProduct } = product;
	return coreProduct;
};
