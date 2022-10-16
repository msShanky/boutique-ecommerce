type Product = {
	id: number;
	image: string;
	price: number;
	size: Array<string>;
};

type CartProduct = ProductCartType & {
	quantity: number;
};

type UserStateType = {
	user: import("@supabase/supabase-js").Session | undefined;
};

type SupaBaseResponse<T> = {
	body: T;
	statusText: null | string;
	status: null | number;
	error: null | any;
	count: null | number;
};

type ProductVariants = {
	variants?: Array<import("../types/supabase").definitions["product_variant"]>;
	category?: import("../types/supabase").definitions["product_category"];
};

type ProductCategory = import("../types/supabase").definitions["product_category"];
type ProductWithRelations = import("../types/supabase").definitions["product"] & ProductVariants;
type ProductPostBody = Omit<ProductWithRelations, "id">;
type CategoryPostBody = Omit<ProductCategory, "id" | "created_at">;
type ProductVariantPost = Omit<import("../types/supabase").definitions["product_variant"], "id">;

type ProductInformationProps = {
	categoryName: string;
	productCode: string;
};

type ProductCartType = {
	product: ProductWithRelations;
	variant: import("../types/supabase").definitions["product_variant"];
};

type UserWishListItem = import("../types/supabase").definitions["user_wishlist"] & {
	product: ProductWithRelations;
};

type CheckoutFormValue = {
	phone_number: string;
	first_name: string;
	last_name: string;
	address: string;
	address_line_two: string;
	city: string;
	country: string;
	pin_code: string;
};

type PaymentOrderPostBody = {
	products: Array<CartProduct>;
	shipping_address: CheckoutFormValue;
	user_id?: string;
};

type CheckoutPostBody = {
	products: Array<CartProduct>;
	shipping_address: CheckoutFormValue;
	payment: RazorPaySuccess;
	user_id?: string;
};

type OrderItemWithRelations = import("../types/supabase").definitions["order_item"] & {
	product: import("../types/supabase").definitions["product"] & {
		category: import("../types/supabase").definitions["product_category"];
	};
	product_variant: import("../types/supabase").definitions["product_variant"];
};

type UserOrderWithRelations = import("../types/supabase").definitions["user_order"] & {
	order_item: Array<OrderItemWithRelations>;
	order_status: import("../types/supabase").definitions["order_status"];
};

type RazorpayOrderResponse = {
	id: string;
	entity: string;
	amount: number;
	amount_paid: number;
	amount_due: number;
	currency: string;
	receipt: string;
	status: string;
	notes: Array<string>;
	created_at: number;
};

type RazorPayError = {
	error: {
		code: any;
		description: any;
		source: any;
		step: any;
		reason: any;
		metadata: {
			order_id: string;
			payment_id: string;
		};
	};
};

type RazorPaySuccess = {
	razorpay_order_id: string;
	razorpay_payment_id: string;
	razorpay_signature: string;
};
