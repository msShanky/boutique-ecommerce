import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { definitions } from "types/supabase";

const getProductFromProductCode = async (req: NextApiRequest, res: NextApiResponse) => {
	const { product_code } = req.query;
	const _productCode = parseInt(product_code as string, 10);
	const getAllProducts = await supabaseClient
		.from<definitions["product"]>("product")
		.select(
			`id,code,images,category_id,msrp,title,sub_title,product_discount,
	category:category_id (id,category),
	variants: product_variant(id,sku,size,inventory_count)`
		)
		// @ts-ignore
		.order("size", { foreignTable: "product_variant", ascending: false })
		.eq("code", _productCode);
	const { data, ...response } = getAllProducts;
	res.status(200).json(response);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") {
		return getProductFromProductCode(req, res);
	}
}
