import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { definitions } from "types/supabase";

export const getProductsForGenderGroup = async (genderId: number) => {
	const getAllProducts = await supabaseClient
		.from<definitions["product"]>("product")
		.select(
			// 		`id,code,images,category_id,msrp,title,sub_title,product_discount,
			// category:category_id (id,category),
			// variants: product_variant(id,sku,size,inventory_count)`
			`id,code,images,category_id,msrp,title,sub_title,product_discount,page_link,
			variants:product_variant(id,sku,size,inventory_count),
			category:category_id (*),
			gender_group(*),
			sub_category:sub_category_id(*)`
		)
		// @ts-ignore
		.order("size", { foreignTable: "product_variant", ascending: false })
		.eq("gender_group_id", genderId);
	const { data } = getAllProducts;
	return data;
};

export const getProductsForCategory = async (categoryId: number) => {
	const getAllProducts = await supabaseClient
		.from<definitions["product"]>("product")
		.select(
			// 		`id,code,images,category_id,msrp,title,sub_title,product_discount,
			// category:category_id (id,category),
			// variants: product_variant(id,sku,size,inventory_count)`
			`id,code,images,category_id,msrp,title,sub_title,product_discount,page_link,
	variants:product_variant(id,sku,size,inventory_count),
	category:category_id (*),
	gender_group(*),
	sub_category:sub_category_id(*)`
		)
		// @ts-ignore
		.order("size", { foreignTable: "product_variant", ascending: false })
		.eq("category_id", categoryId);
	const { data } = getAllProducts;
	return data;
};

export const getAllProductSlugs = async () => {
	const productSlugs = await supabaseClient
		.from<definitions["product"]>("product")
		.select(`id,page_link,gender_group(id,gender),category:category_id(id,category,page_link)`)
		.not("page_link", "eq", null);

	return productSlugs.data as unknown as Array<ProductPageSlugs>;
};

export const getProductDetailsForSlugs = async (productSlug: string) => {
	const productDetails = await supabaseClient
		.from<definitions["product"]>("product")
		.select(
			`id,code,images,category_id,msrp,title,sub_title,product_discount,page_link,
			variants:product_variant(id,sku,size,inventory_count),
			category:category_id (*),
			gender_group(*),
			sub_category:sub_category_id(*)
		`
		)
		.eq("page_link", productSlug.trim());

	if (!productDetails.data || productDetails.data?.length <= 0) return null;

	return productDetails.data[0];
};
