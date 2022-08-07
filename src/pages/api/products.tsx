// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { definitions } from "../../types/supabase";

const getAllProductsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	const getAllProducts = await supabaseClient.from<definitions["product"]>("product").select(`
	id,code,images,category_id,msrp,
	category:category_id (id,category),
	variants: product_variant(id,sku,size)
	`);
	const { data, ...response } = getAllProducts;
	res.status(200).json(response);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") {
		const containsQuery = Object.keys(req.query).length > 0;
		return getAllProductsHandler(req, res);
	}
}
