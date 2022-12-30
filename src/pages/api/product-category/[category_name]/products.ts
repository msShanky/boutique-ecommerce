import { PostgrestResponse } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";
import { definitions } from "../../../../types/supabase";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

const getProductsForCategory = async (
	categoryId: number,
	isAdmin: boolean,
	from: number,
	to: number
): Promise<PostgrestResponse<definitions["product"]>> => {
	const adminQuery = `*,`;
	const userQuery = `id,code,images,category_id,msrp,title,sub_title,product_discount,`;
	const adminVariantsInventory = `product_variant(id,sku,size,inventory_count)`;
	const userVariants = `product_variant(id,sku,size,inventory_count)`;
	const baseQuery = `${isAdmin ? adminQuery : userQuery}
	category:category_id (id,category),
	variants: ${isAdmin ? adminVariantsInventory : userVariants}`;
	let supabaseQuery = supabaseClient
		.from<definitions["product"]>("product")
		.select(baseQuery,{count: "exact"})
		// @ts-ignore
		.order("size", { foreignTable: "product_variant", ascending: false })
		.order("id", { ascending: true })
		.eq("category_id", categoryId);
	if (typeof from === 'number' && typeof to === 'number') supabaseQuery = supabaseQuery.range(from, to)
	const productsForCategory = await supabaseQuery
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
		const { category_name, isAdmin, from, to } = req.query;
		const { data: categoryData } = await getCategoryIdByName(category_name as string);
		const _categoryId = categoryData ? categoryData[0].id : undefined;
		if (!_categoryId) res.status(404).send({ message: "Category not found" });
		const { data, ...response } = await getProductsForCategory(_categoryId as number, !!isAdmin, parseInt(from as string), parseInt(to as string));

		res.status(200).json(response);
	}
}
