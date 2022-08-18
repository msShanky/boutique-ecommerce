import { PostgrestResponse } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";
import { definitions } from "../../../../types/supabase";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

const getProductsForCategory = async (categoryId: number): Promise<PostgrestResponse<definitions["product"]>> => {
	const productsForCategory = await supabaseClient
		.from<definitions["product"]>("product")
		.select(
			`id,code,images,category_id,msrp,title,sub_title,product_discount,
		category:category_id (id,category),
		variants: product_variant(id,sku,size)`
		)
		// @ts-ignore
		.order("size", { foreignTable: "product_variant", ascending: false })
		.eq("category_id", categoryId);
	return productsForCategory;
};

const getCategoryIdByName = async (category_name: string) => {
	return await supabaseClient
		.from<definitions["product_category"]>("product_category")
		.select("id")
		.ilike("category", category_name);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") {
		const { category_name } = req.query;
		const { data: categoryData } = await getCategoryIdByName(category_name as string);
		const _categoryId = categoryData ? categoryData[0].id : undefined;

		if (!_categoryId) res.status(404).send({ message: "Category not found" });

		const { data, ...response } = await getProductsForCategory(_categoryId as number);

		res.status(200).json(response);
	}
}
