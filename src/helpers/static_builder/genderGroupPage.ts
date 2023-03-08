import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { definitions } from "types/supabase";
import { getProductsForGenderGroup } from "./productsHandler";

export const getGenderGroupPages = async () => {
	const { data: genderGroup } = await supabaseClient.from<definitions["gender_group"]>("gender_group").select(`*`);
	return genderGroup;
};

export const getCategoriesAndProductsForGenderGroup = async (gender: string) => {
	const { data: genderGroupData } = await supabaseClient
		.from<definitions["gender_group"]>("gender_group")
		.select("*")
		.textSearch("gender", gender);

	if (!genderGroupData || genderGroupData?.length <= 0) return null;

	const { data: genderCategories } = await supabaseClient
		.from<definitions["product_category"]>("product_category")
		.select(`*, gender_group (*), product_sub_category(*, node_categories:product_sub_category(*))`)
		// @ts-ignore
		.is("product_sub_category.parent_id", null)
		.eq("gender_group_id", genderGroupData[0].id);

	return {
		gender: genderGroupData[0],
		categories: genderCategories,
		products: await getProductsForGenderGroup(genderGroupData[0].id),
	};
};
