import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { definitions } from "types/supabase";

export const getHomePageData = async () => {
	const getFeaturedProducts = await supabaseClient
		.from<definitions["product"]>("product")
		.select(
			`id,code,images,category_id,msrp,title,sub_title,product_discount,
category:category_id (id,category),
variants: product_variant(id,sku,size,inventory_count)`
		)
		// @ts-ignore
		.order("size", { foreignTable: "product_variant", ascending: false });

	const allProductCategories = await supabaseClient
		.from<definitions["product_category"]>("product_category")
		.select(`*`);
	const { data: categoryData, ...categoryResponse } = allProductCategories;

	const { data, ...response } = getFeaturedProducts;

	// TODO: Update this logic to fetch the featured products
	return {
		// @ts-ignore
		featured: response.body?.filter((item) => item?.variants.length > 0),
		categories: categoryResponse.body,
	};
};
