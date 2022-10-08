import { OrderData } from "@/components/common/admin/order/types";
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
		getOrders: builder.query<SupaBaseResponse<Array<OrderData>>, void>({
			query: () => `orders`
		}),
		getOrderStatus: builder.query<SupaBaseResponse<Array<definitions['order_status']>>, void>({
			query: () => `orders/order-status`
		}),
		getOrderItemsByOrderId: builder.query<SupaBaseResponse<Array<OrderItemWithRelations>>, string>({
			query: (id: string) => `orders/order-items/${id}`
		}),
		setOrderStatus: builder.mutation<any, definitions['user_order']>({
			query: ({ id, ...orderData }) => ({
				url: `/orders/${id}`,
				method: "PATCH",
				body: orderData,
			}),
		}),
		getUserWishlist: builder.query<SupaBaseResponse<Array<UserWishListItem>>, string>({
			query: (id: string) => `wishlist/${id}`
		})
	}),
});

export const {
  	useLazyGetProductCategoriesQuery,
	useGetProductCategoriesQuery,
	useGetProductsByCategoryNameQuery,
	useGetProductsForAdminByCategoryNameQuery,
	useLazyGetProductsForAdminByCategoryNameQuery,
	useGetProductsByCodeQuery,
	useCheckoutProductMutation,
	useLazyGetOrdersQuery,
	useGetOrderStatusQuery,
	useGetOrderItemsByOrderIdQuery,
	useSetOrderStatusMutation,
	useLazyGetUserWishlistQuery
} = breezeBaseApi;
