import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { definitions } from "../types/supabase";

export const breezeBaseApi = createApi({
	reducerPath: "breezeBaseApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
	endpoints: (builder) => ({
		getGenderGroup: builder.query<SupaBaseResponse<Array<definitions["gender_group"]>>, void>({
			query: () => `product-management/gender-group`,
		}),
		getProductCategories: builder.query<SupaBaseResponse<Array<definitions["product_category"]>>, void>({
			query: () => `product-management/categories?gender=1`,
		}),
		getProductSubCategory: builder.query<SupaBaseResponse<Array<definitions["product_sub_category"]>>, void>({
			query: () => `product-management/sub-categories?category=1`,
		}),
	}),
});

export const { useGetGenderGroupQuery, useGetProductCategoriesQuery, useGetProductSubCategoryQuery } = breezeBaseApi;
