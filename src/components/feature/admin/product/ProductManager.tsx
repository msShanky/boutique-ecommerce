import React, { FunctionComponent } from "react";
import { definitions } from "types/supabase";
import ProductForm from "./ProductForm";
import ProductSuccess from "./ProductSuccess";

type ProductManagerProps = {
	productApiState: ApiStatus;
	handleCancel: () => void;
	handleProductUpdate: (product: ProductPostBody) => void;
	crudState: AdminCRUDContent;
	activeProduct: ProductWithRelations;
	categories?: Array<definitions["product_category"]>;
};

const ProductManager: FunctionComponent<ProductManagerProps> = (props) => {
	const { productApiState, crudState, activeProduct, categories } = props;
	const { handleCancel, handleProductUpdate } = props;
	const validateText = "Please validate the product details and information related to products";
	const successText = `Product has been ${crudState === "create" ? "added" : "updated"}!`;

	if (productApiState === "success")
		return <ProductSuccess onCancel={handleCancel} successText={successText} validateText={validateText} />;

	return (
		<ProductForm
			isAdd={crudState === "create"}
			product={activeProduct}
			categories={categories}
			handleSubmit={(values) => handleProductUpdate(values)}
			handleCancel={handleCancel}
		/>
	);
};

export default ProductManager;
