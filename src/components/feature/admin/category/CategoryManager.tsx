import React, { FunctionComponent } from "react";
import CategoryForm from "./CategoryForm";
import ProductSuccess from "../product/ProductSuccess";

type CategoryManagerProps = {
	crudState: AdminCRUDContent;
	activeCategory: ProductCategory;
	categoryApiState: ApiStatus;
	handleCancel: () => void;
	handleCategoryUpdate: (category: CategoryPostBody) => void;
};

const CategoryManager: FunctionComponent<CategoryManagerProps> = (props) => {
	const { crudState, handleCancel, categoryApiState, handleCategoryUpdate, activeCategory } = props;
	const validateText = "Please validate the product details and information related to products";
	const successText = `Product has been ${crudState === "create" ? "added" : "updated"}!`;
	
	if (categoryApiState === "success")
		return <ProductSuccess onCancel={handleCancel} successText={successText} validateText={validateText} />;

	return (
		<CategoryForm
			isAdd={crudState === "create"}
			category={activeCategory}
			handleCancel={handleCancel}
			handleSubmit={(values) => handleCategoryUpdate(values)}
		/>
	);
};
export default CategoryManager;
