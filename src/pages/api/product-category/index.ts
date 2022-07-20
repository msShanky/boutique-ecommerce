import type { NextApiRequest, NextApiResponse } from "next";
import { definitions } from "../../../types/supabase";
import { supabase } from "../../../utils/supabaseClient";

const getAllProductCategoryHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	const getAllProductCategories = await supabase.from<definitions["product_category"]>("product_category").select(`*`);
	const { data, ...response } = getAllProductCategories;
	console.log("the response from the products are", getAllProductCategories);
	res.status(200).json(response);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") {
		return getAllProductCategoryHandler(req, res);
	}
}
