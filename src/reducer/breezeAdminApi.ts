import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { definitions } from "../types/supabase";

export const breezeAdminBaseApi = createApi({
	reducerPath: "breezeAdminBaseApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
	endpoints: (builder) => ({
		// getGenderGroup: builder.query<SupaBaseResponse<Array<definitions["gender_group"]>>, void>({
		getGenderGroup: builder.query<Array<definitions["gender_group"]>, void>({
			query: () => `product-management/gender-group`,
		}),
		getCategoriesByGenderId: builder.query<Array<definitions["product_category"]>, number>({
			query: (genderId) => `product-management/categories?gender=${genderId}`,
		}),
		getSubCategoryByCategoryId: builder.query<Array<definitions["product_sub_category"]>, number>({
			query: (categoryId) => `product-management/sub-categories?category=${categoryId}`,
		}),
		getNodeCategoryByCategoryId: builder.query<Array<definitions["product_sub_category"]>, number>({
			query: (categoryId) => `product-management/sub-categories?category=${categoryId}`,
		}),
	}),
});

export const {
	useGetGenderGroupQuery,
	useLazyGetCategoriesByGenderIdQuery,
	useLazyGetSubCategoryByCategoryIdQuery,
	useLazyGetNodeCategoryByCategoryIdQuery,
} = breezeAdminBaseApi;
