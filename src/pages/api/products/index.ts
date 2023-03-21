import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { definitions } from "types/supabase";

const getProductsForGenderGroup = async (genderId: number) => {
	const getAllProducts = await supabaseClient
		.from<definitions["product"]>("product")
		.select(
			`id,code,images,category_id,msrp,title,sub_title,product_discount,
	category:category_id (id,category),
	variants: product_variant(id,sku,size,inventory_count)`
		)
		// @ts-ignore
		.order("size", { foreignTable: "product_variant", ascending: false })
		.eq("gender_group_id", genderId);
	const { data } = getAllProducts;
	return data;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") {
		// return getProductFromProductCode(req, res);
		if (req.query.genderId) {
			const genderId = parseInt(req.query.genderId as string, 10);
			return res.status(200).json({ products: await getProductsForGenderGroup(genderId) });
		}
		return res.status(200).json({ products: [] });
	}
}
