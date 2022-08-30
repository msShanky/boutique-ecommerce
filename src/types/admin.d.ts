type AdminPageContent = "product" | "order" | "report" | "dashboard" | "category";

type AdminCRUDContent = "create" | "read" | "update" | "delete";

type ApiStatus = "idle" | "in-progress" | "success" | "error";

type AdminProductFormView = "product-info" | "product-variant";

type ProductFormStateProps = {
	code: number | null;
	images?: Array<string>;
	category_id?: number;
	description?: string;
	title?: string;
	sub_title?: string;
	purchase_price?: string;
	msrp?: number | null;
	product_discount?: number | null;
};

type AdminPanelLink = {
	content: AdminPageContent;
	label: string;
	icon: TablerIcon;
};

type AdminFormVariant = {
	sku: number | null;
	size: string;
	inventory_count: number | null;
};
