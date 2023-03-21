import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { definitions } from "types/supabase";

export const getCategoryMenuLinks = async () => {
	const { data: genderGroup } = await supabaseClient.from<definitions["gender_group"]>("gender_group").select(`*`);

	const { data: productCategory } = await supabaseClient
		.from<definitions["product_category"]>("product_category")
		.select(`*, gender_group (*), product_sub_category(*, node_categories:product_sub_category(*))`)
		.eq("is_published", true)
		// @ts-ignore
		.is("product_sub_category.parent_id", null);

	if (!genderGroup || !productCategory) return null;


	// @ts-ignore
	const constructedMenu: Array<MenuLinkPropTypes> = genderGroup?.map((genderValue) => {
		const { id, gender } = genderValue;
		// TODO: add a link to each of the categories inside the database
		const genderCategory = productCategory?.filter((categoryValue) => {
			const { gender_group_id } = categoryValue;
			return gender_group_id === id;
		});

		return {
			menuLabel: gender as string,
			menuLink: `/shop/${gender?.toLowerCase()}`,
			categories: genderCategory,
		};
	});

	return constructedMenu;
};
