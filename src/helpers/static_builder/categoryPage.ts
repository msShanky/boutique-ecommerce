import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { definitions } from "types/supabase";
import { getProductsForCategory } from "./productsHandler";

export const getCategoriesForPage = async (): Promise<Array<ProductCategoriesWithGender>> => {
	const { data: productCategory } = await supabaseClient
		.from<definitions["product_category"]>("product_category")
		.select(`*,  gender_group (*)`);
	return productCategory as Array<ProductCategoriesWithGender>;
};

export const getSubCategoriesAndProductsForCategory = async (categorySlug: string) => {
	const { data: categoryData } = await supabaseClient
		.from<definitions["product_category"]>("product_category")
		.select("*, gender_group (*)")
		.textSearch("page_link", `/${categorySlug}`);

	if (!categoryData || categoryData?.length <= 0) return null;

	const { data: subCategories } = await supabaseClient
		.from<definitions["product_sub_category"]>("product_sub_category")
		.select("*, node_categories:product_sub_category(*)")
		.is("parent_id", null)
		.eq("category_id", categoryData[0].id);

	return {
		category: categoryData[0],
		subCategories,
		products: await getProductsForCategory(categoryData[0].id),
	};
};
