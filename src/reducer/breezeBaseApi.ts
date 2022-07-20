import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Session } from "@supabase/supabase-js";
// import { RootState } from "../app/store";
import { definitions } from "../types/supabase";

export const breezeBaseApi = createApi({
	reducerPath: "breezeBaseApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
	endpoints: (builder) => ({
		getProductCategories: builder.query<SupaBaseResponse<Array<definitions["product_category"]>>, void>({
			query: () => `product-category`,
		}),
		getProductsByCategoryName: builder.query<SupaBaseResponse<Array<ProductWithRelations>>, string>({
			query: (categoryName: string) => `product-category/${categoryName}/products`,
		}),
	}),
});

export const { useGetProductCategoriesQuery, useGetProductsByCategoryNameQuery } = breezeBaseApi;
