import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { definitions } from "types/supabase";

const homeCarousal = [
	{
		// sourceURI: "home-banner/bridal_makeup_saree.webp",
		sourceURI: "/images/home/banner/banner_1.png",
		// style: "md:mt-[140px]",
		style: "",
	},
	{
		// sourceURI: "home-banner/contemporary_dress_green_background.webp",
		sourceURI: "/images/home/banner/banner_2.png",
		style: "",
		// style: "md:mt-[140px]",
	},
	{
		// sourceURI: "home-banner/red_saree_garden_background.webp",
		sourceURI: "/images/home/banner/banner_3.png",
		style: "",
		// style: "md:mt-[140px]",
	},
	// {
	// 	sourceURI: "home-banner/saree_home_background.webp",
	// 	style: "",
	// 	// style: "md:mt-[140px]",
	// },
	// {
	// 	sourceURI: "home-banner/saree_temple_background.webp",
	// 	style: "",
	// 	// style: "md:mt-[140px]",
	// },
];

export const getHomePageData = async () => {
	try {
		const getFeaturedProducts = await supabaseClient
			.from<definitions["product"]>("product")
			.select(
				`id,code,images,category_id,msrp,title,sub_title,product_discount,page_link,
			variants:product_variant(id,sku,size,inventory_count),
			category:category_id (*),
			gender_group(*),
			sub_category:sub_category_id(*)`
			)
			// @ts-ignore
			.order("size", { foreignTable: "product_variant", ascending: false });

		const allProductCategories = await supabaseClient
			.from<definitions["product_category"]>("product_category")
			.select("*, gender_group (*)")
			.eq("is_published", true)
			.limit(5);

		const { data: categoryData, ...categoryResponse } = allProductCategories;
		const { data, ...response } = getFeaturedProducts;

		// @ts-ignore
		const featuredProducts = response.body?.filter((item) => item?.variants.length > 0) || [];

		// TODO: Update this logic to fetch the featured products
		return {
			featured: featuredProducts,
			categories: categoryResponse.body,
			bannerContent: homeCarousal,
		};
	} catch (error) {
		return {
			featured: null,
			categories: null,
			bannerContent: homeCarousal,
		};
	}
};
