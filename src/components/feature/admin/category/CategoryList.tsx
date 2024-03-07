import React, { FunctionComponent } from "react";
import { definitions } from "types/supabase";
import CategoryTable from "./CategoryTable";
import CategoryFloatingBar from "./CategoryFloatingBar";

type CategoryListProps = {
	categories?: Array<definitions["product_category"]>;
	toggleAdd: () => void;
	toggleEdit: (category: ProductCategory) => void;
	toggleDelete: (category: ProductCategory) => void;
};

const CategoryList: FunctionComponent<CategoryListProps> = (props) => {
	const { categories, toggleAdd, toggleEdit, toggleDelete } = props;

	return (
		<div>
			<div className="flex items-end space-x-8">
				<CategoryFloatingBar toggleAdd={toggleAdd} />
			</div>
			{categories && categories.length > 0 && (
				<CategoryTable categories={categories} toggleEdit={toggleEdit} toggleDelete={toggleDelete} />
			)}
		</div>
	);
};

export default CategoryList;
