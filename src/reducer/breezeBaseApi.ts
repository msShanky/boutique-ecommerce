import { OrderData, OrderFilterFormValues } from "@/components/feature/admin/order/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { definitions } from "../types/supabase";

interface Range {
	from?: number;
	to?: number;
}

type CategoryProductsQueryProps = Range & { categoryName: string; isAdmin: boolean };
type OrdersQueryProps = Range & OrderFilterFormValues;

export const breezeBaseApi = createApi({
	reducerPath: "breezeBaseApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
	endpoints: (builder) => ({
		getProductCategories: builder.query<SupaBaseResponse<Array<definitions["product_category"]>>, void>({
			query: () => `product-category`,
		}),
		getProductsByCategoryName: builder.query<SupaBaseResponse<Array<ProductWithRelations>>, CategoryProductsQueryProps>(
			{
				query: (props: CategoryProductsQueryProps) => {
					const { categoryName, from, to, isAdmin = false } = props;
					let queryString = `product-category/${categoryName}/products`;
					if (typeof from === "number" && typeof to === "number") {
						queryString += `?from=${from}&to=${to}&isAdmin=${isAdmin}`;
					}
					return queryString;
				},
			}
		),
		getProductsForAdminByCategoryName: builder.query<SupaBaseResponse<Array<ProductWithRelations>>, string>({
			query: (categoryName: string) => {
				return `product-category/${categoryName}/products?isAdmin=true`;
			},
		}),
		getProductsByCode: builder.query<SupaBaseResponse<Array<ProductWithRelations>>, ProductInformationProps>({
			query: (props: ProductInformationProps) => `products/${props.categoryName}/${props.productCode}`,
		}),
		initiatePayment: builder.mutation<RazorpayOrderResponse, PaymentOrderPostBody>({
			query: (body) => ({
				url: "/payment/initiate",
				method: "POST",
				body: body,
			}),
		}),
		checkoutProduct: builder.mutation<any, CheckoutPostBody>({
			query: (body) => ({
				url: "/checkout",
				method: "POST",
				body: body,
			}),
		}),
		getOrders: builder.query<SupaBaseResponse<Array<OrderData>>, OrdersQueryProps>({
			query: (props: OrdersQueryProps) => {
				const { from, to, ...filters } = props;
				let queryString = `orders?`;
				if (typeof from === "number" && typeof to === "number") {
					queryString += `from=${from}&to=${to}`;
				}
				for (const filter in filters) {
					const filterValue = filters[filter as keyof OrderFilterFormValues];
					if (filterValue !== null) queryString += `&${filter}=${filterValue}`;
				}
				return queryString;
			},
		}),
		getOrderStatus: builder.query<SupaBaseResponse<Array<definitions["order_status"]>>, void>({
			query: () => `orders/order-status`,
		}),
		getOrderItemsByOrderId: builder.query<SupaBaseResponse<Array<OrderItemWithRelations>>, string>({
			query: (id: string) => `orders/order-items/${id}`,
		}),
		setOrderStatus: builder.mutation<any, definitions["user_order"]>({
			query: ({ id, ...orderData }) => ({
				url: `/orders/${id}`,
				method: "PATCH",
				body: orderData,
			}),
		}),
		getUserWishlist: builder.query<SupaBaseResponse<Array<UserWishListItem>>, string>({
			query: (id: string) => `wishlist/${id}`,
		}),
	}),
});

export const {
	useLazyGetProductCategoriesQuery,
	useGetProductCategoriesQuery,
	useGetProductsByCategoryNameQuery,
	useLazyGetProductsByCategoryNameQuery,
	useGetProductsForAdminByCategoryNameQuery,
	useLazyGetProductsForAdminByCategoryNameQuery,
	useGetProductsByCodeQuery,
	useCheckoutProductMutation,
	useLazyGetOrdersQuery,
	useGetOrderStatusQuery,
	useGetOrderItemsByOrderIdQuery,
	useSetOrderStatusMutation,
	useLazyGetUserWishlistQuery,
	useInitiatePaymentMutation,
} = breezeBaseApi;
