import type { NextApiRequest, NextApiResponse } from "next";
import { definitions } from "../../../../types/supabase";
import { supabase } from "../../../../utils/supabaseClient";

const getProductFromProductCode = async (req: NextApiRequest, res: NextApiResponse) => {
	const { product_code, category_name } = req.query;
	console.log(req.query, "The request query received is");
	const _productCode = parseInt(product_code as string, 10);
	const getAllProducts = await supabase
		.from<definitions["product"]>("product")
		.select(
			`id,code,images,category_id,msrp,title,sub_title,product_discount,
	category:category_id (id,category),
	variants: product_variant(id,sku,size)`
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
