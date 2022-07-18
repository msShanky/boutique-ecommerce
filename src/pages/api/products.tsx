// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { definitions } from "../../types/supabase";
import { supabase } from "../../utils/supabaseClient";

const getAllProductsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	const getAllProducts = await supabase.from<definitions["product"]>("product").select(`
	id,code,images,category_id,msrp,
	category:category_id (id,category),
	variants: product_variant(id,sku,size)
	`);
	const { data, ...response } = getAllProducts;
	console.log("the response from the products are", getAllProducts);
	res.status(200).json(response);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") {
		return getAllProductsHandler(req, res);
	}
}
