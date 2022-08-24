type AdminPageContent = "product" | "order" | "report" | "dashboard";

type AdminCRUDContent = "create" | "read" | "update" | "delete";

type ApiStatus = "idle" | "in-progress" | "success" | "error";

type ProductFormStateProps = {
	code?: string;
	images?: Array<string>;
	category_id?: string;
	description?: string;
	title?: string;
	sub_title?: string;
	purchase_price?: string;
	msrp?: number | null;
	product_discount?: number | null;
};
