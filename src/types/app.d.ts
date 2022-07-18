type Product = {
	id: number;
	image: string;
	price: number;
	size: Array<string>;
};

type SelectedProduct = Product & {
	selectedSize: string;
};

type CartProduct = SelectedProduct & {
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
