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
