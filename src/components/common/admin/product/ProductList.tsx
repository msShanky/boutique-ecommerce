import { ProductTable } from "@/components/feature";
import React, { FunctionComponent, useEffect, useState } from "react";
import { definitions } from "types/supabase";
import ProductFloatingBar from "../ProductFloatingBar";

type ProductListProps = {
	categories?: Array<definitions["product_category"]>;
	toggleProductAdd: () => void;
	handleProductEdit: (product: ProductWithRelations) => void;
};

const ProductList: FunctionComponent<ProductListProps> = (props) => {
	const { categories, toggleProductAdd, handleProductEdit } = props;
	const [selectedCategory, setSelectedCategory] = useState<definitions["product_category"] | null>();
	const handleCategoryUpdate = (value: definitions["product_category"] | null) => {
		setSelectedCategory(value);
	};

	const handleCategoryChange = (value: string | null) => {
		if (!value) return null;
		const _selectedCategory = categories?.filter((category) => category.id === parseInt(value, 10))[0];
		if (!_selectedCategory) return null;
		handleCategoryUpdate(_selectedCategory);
	};

	useEffect(() => {
		handleCategoryUpdate(categories?.[0] || null);
	}, [categories]);

	return (
		<div>
			<div className="flex items-end space-x-8">
				{/* Convert this to a component called ProductFloatingBar */}
				<ProductFloatingBar
					categories={categories}
					handleCategoryChange={handleCategoryChange}
					toggleProductAdd={toggleProductAdd}
					selectedCategory={selectedCategory?.id.toString() as string}
				/>
			</div>
			{selectedCategory && (
				<ProductTable category={selectedCategory.category as string} handleProductEdit={handleProductEdit} />
			)}
		</div>
	);
};

export default ProductList;
