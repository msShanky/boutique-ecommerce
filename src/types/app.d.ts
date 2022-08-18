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

type ProductWithRelations = import("../types/supabase").definitions["product"] & ProductVariants;

type ProductInformationProps = {
	categoryName: string;
	productCode: string;
};

type ProductCartType = {
	product: ProductWithRelations;
	variant: import("../types/supabase").definitions["product_variant"];
};

type UserWishListItem = import("../types/supabase").definitions["product_variant"] & {
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

type CheckoutPostBody = {
	products: Array<CartProduct>;
	shipping_address: CheckoutFormValue;
	user_id?: string;
};

type OrderItemWithRelations = import("../types/supabase").definitions["order_item"] & {
	product: import("../types/supabase").definitions["product"];
	product_variant: import("../types/supabase").definitions["product_variant"];
};

type UserOrderWithRelations = import("../types/supabase").definitions["user_order"] & {
	order_item: Array<OrderItemWithRelations>;
	order_status: import("../types/supabase").definitions["order_status"];
};
