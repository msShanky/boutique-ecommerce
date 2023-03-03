import type { NextApiRequest, NextApiResponse } from "next";
// import { PostgrestResponse } from "@supabase/supabase-js";
// import { definitions } from "../../../../types/supabase";
import { definitions } from "@/types/supabase";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

const getGenderGroup = async () => {
	const genderGroupResponse = await supabaseClient.from<definitions["gender_group"]>("gender_group").select(`*`);
	return genderGroupResponse.data;
};

const getCategoriesForGenderId = async (genderId: number) => {
	const genderGroupResponse = await supabaseClient
		.from<definitions["product_category"]>("product_category")
		.select(`*`)
		.eq("gender_group_id", genderId);
	return genderGroupResponse.data;
};

const getSubCategoriesForCategoryId = async (categoryId: number) => {
	const genderGroupResponse = await supabaseClient
		.from<definitions["product_sub_category"]>("product_sub_category")
		.select(`*`)
		.eq("parent_id", categoryId);
	return genderGroupResponse.data;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") {
		const { route } = req.query;

		switch (route) {
			case "gender-group":
				return res.status(200).json({ gender: await getGenderGroup() });

			case "categories":
				return res.status(200).json({
					categories: await getCategoriesForGenderId(1),
				});

			case "sub-categories":
				return res.status(200).json({ message: await getSubCategoriesForCategoryId(1) });

			default:
				break;
		}

		console.log("The query parameter returned for the route inside product-management", req.query, req.url);

		res.status(200).json({
			message: "There is a new response from the dynamic route for product-management",
		});
	}
}
