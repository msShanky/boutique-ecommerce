import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestError } from "@supabase/supabase-js";
import { definitions } from "types/supabase";

type ProductCategorySelect = { value: string; label: string };

type GetCategoryDataInput = Array<definitions["product_category"]> | undefined;

export const getCategoryData = (categories: GetCategoryDataInput): Array<ProductCategorySelect> => {
	if (!categories) return [];
	return categories.map((category) => {
		return {
			value: category?.id.toString() ?? "",
			label: category?.category ?? "",
		};
	});
};

export const formatProductFormForUpdate = (product: ProductPostBody): ProductPostBody => {
	const { category, ...coreProduct } = product;
	return coreProduct;
};

export const formatCategoryFormForUpdate = (category: CategoryPostBody): CategoryPostBody => {
	const { ...coreCategory } = category;
	return coreCategory;
};

export const getImageUrl = (value: any): string => {
	if (!value || value.length === 0) return "";
	// if (value[0].includes("https")) return value[0];
	// return `${process.env.NEXT_PUBLIC_CDN}/${value[0]}`;
	if (value.includes("https")) return value;
	return `${process.env.NEXT_PUBLIC_CDN}/${value}`;
};

// type ProductVariantCallBack = {
// 	errorCallBack: () => void;
// 	successCallback: () => void;
// };

export const manageProductVariants = async (product: ProductWithRelations, containsVariant: boolean) => {
	const { variants, id } = product;
	if (!variants || variants.length <= 0) {
		return;
	}
	const variantsBody = variants.map((variant) => {
		return { ...variant, product_id: id };
	});

	if (!containsVariant) {
		await supabaseClient.from("product_variant").insert(variantsBody);
	} else {
		const { data: variantsData } = await supabaseClient.from("product_variant").upsert(variantsBody);
	}
};

export const getCategoryThumbnail = (category: string) => {
	if (!category.includes(" ")) return category[0];

	if (category.includes("/")) return `${category?.split(" / ")[0][0]} ${category?.split(" / ")[1][0].toUpperCase()}`;

	return `${category?.split(" ")[0][0]} ${category?.split(" ")[1][0].toUpperCase()}`;
};

export const getCategoryLink = (category: ProductCategoryWithRelations) => {
	const { gender_group, page_link } = category;
	const genderURI = `${gender_group?.gender?.toLowerCase()}`;
	const categoryLink = `/shop/${genderURI}${page_link}`;
	return categoryLink;
};

export const getSubCategoryLink = (category: ProductCategoryWithRelations, subCategory: SubCategoryWithRelations) => {
	const categoryLink = getCategoryLink(category);
	const subCategoryFilterFacet = `${subCategory.page_link?.split("/")[1]}`;
	const subCategoryLink = `${categoryLink}?filter=${subCategoryFilterFacet}`;
	return subCategoryLink;
};

export const getProductSlug = (product: ProductWithRelations): string => {
	const { gender_group, category, page_link } = product;
	console.log(gender_group, category, page_link, "props for constructing product slug");
	if (!page_link) return "";
	const productSlug = `/shop/${gender_group?.gender?.toLowerCase()}/${category?.page_link?.split("/")[1]}/${page_link}`;

	return productSlug;
};
