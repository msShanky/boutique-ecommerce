import React, { FunctionComponent } from "react";
import { definitions } from "types/supabase";
import ProductForm from "./ProductForm";
import ProductSuccess from "./ProductSuccess";

type ProductManagerProps = {
	productApiState: ApiStatus;
	handleCancel: () => void;
	handleProductUpdate: (product: Omit<ProductWithRelations, "id">) => void;
	crudState: AdminCRUDContent;
	activeProduct: ProductWithRelations;
	categories?: Array<definitions["product_category"]>;
};

const ProductManager: FunctionComponent<ProductManagerProps> = (props) => {
	const { productApiState, handleCancel, handleProductUpdate, crudState, activeProduct, categories } = props;

	if (productApiState === "success") return <ProductSuccess onCancel={handleCancel} />;

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
