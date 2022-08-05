import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { definitions } from "../../../types/supabase";

const getAllProductCategoryHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	const getAllProductCategories = await supabaseClient.from<definitions["product_category"]>("product_category").select(`*`);
	const { data, ...response } = getAllProductCategories;
	console.log("the response from the products are", getAllProductCategories);
	res.status(200).json(response);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") {
		return getAllProductCategoryHandler(req, res);
	}
}
