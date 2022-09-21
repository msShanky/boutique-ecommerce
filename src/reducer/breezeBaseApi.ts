import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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
		getProductsForAdminByCategoryName: builder.query<SupaBaseResponse<Array<ProductWithRelations>>, string>({
			query: (categoryName: string) => `product-category/${categoryName}/products?isAdmin=true`,
		}),
		getProductsByCode: builder.query<SupaBaseResponse<Array<ProductWithRelations>>, ProductInformationProps>({
			query: (props: ProductInformationProps) => `products/${props.categoryName}/${props.productCode}`,
		}),
		checkoutProduct: builder.mutation<any, CheckoutPostBody>({
			query: (body) => ({
				url: "/checkout",
				method: "POST",
				body: body,
			}),
		}),
	}),
});

export const {
	useGetProductCategoriesQuery,
	useGetProductsByCategoryNameQuery,
	useGetProductsForAdminByCategoryNameQuery,
	useLazyGetProductsForAdminByCategoryNameQuery,
	useGetProductsByCodeQuery,
	useCheckoutProductMutation,
} = breezeBaseApi;
