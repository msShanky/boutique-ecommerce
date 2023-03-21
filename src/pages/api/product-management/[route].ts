import type { NextApiRequest, NextApiResponse } from "next";
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
	const productSubCategoryResponse = await supabaseClient
		.from<definitions["product_sub_category"]>("product_sub_category")
		.select(`*`)
		.eq("category_id", categoryId)
		.is("parent_id", null);
	return productSubCategoryResponse.data;
};

const getNodeCategoriesForCategoryId = async (categoryId: number) => {
	const nodeSubCategoryResponse = await supabaseClient
		.from<definitions["product_sub_category"]>("product_sub_category")
		.select(`*`)
		.eq("parent_id", categoryId);
	return nodeSubCategoryResponse.data;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") {
		const { route } = req.query;

		switch (route) {
			case "gender-group":
				const genderGroupResponse = await getGenderGroup();
				return res.status(200).json(genderGroupResponse);

			case "categories":
				if (!req.query.gender) {
					return res.status(404).json({
						message: "No gender provided",
					});
				}

				const categories = await getCategoriesForGenderId(parseInt(req.query.gender as string, 10));
				return res.status(200).json(categories);

			case "sub-categories":
				if (!req.query.category) {
					return res.status(404).json({
						message: "No sub categories provided",
					});
				}

				const subCategory = await getSubCategoriesForCategoryId(parseInt(req.query.category as string, 10));
				return res.status(200).json(subCategory);

			case "node-categories":
				if (!req.query.category) {
					return res.status(404).json({
						message: "No sub categories provided",
					});
				}

				const nodeCategory = await getNodeCategoriesForCategoryId(parseInt(req.query.category as string, 10));
				return res.status(200).json(nodeCategory);

			default:
				break;
		}


		res.status(200).json({
			message: "There is a new response from the dynamic route for product-management",
		});
	}
}
