import React, { useState, useEffect } from "react";
import { Drawer } from "@mantine/core";
import { useGetProductCategoriesQuery } from "@/reducer/breezeBaseApi";
import { definitions } from "types/supabase";
import { ProductForm, ProductTable } from "@/components/feature";
import { ProductFloatingBar } from "@/components/common/admin";
import { ProductList } from "@/components/common/admin/product";

const ProductContent = () => {
	const [selectedCategory, setSelectedCategory] = useState<definitions["product_category"] | null>();
	const [isAddProduct, setIsProductAdd] = useState(false);
	const [shouldOpenDrawer, setShouldOpenDrawer] = useState(false);
	const [crudState, setCrudState] = useState<AdminCRUDContent>("read");
	const [activeProduct, setActiveProduct] = useState<ProductWithRelations>();

	const { data: categories, isLoading } = useGetProductCategoriesQuery();

	// const handleCategoryUpdate = (value: definitions["product_category"] | null) => {
	// 	setSelectedCategory(value);
	// };

	// const handleCategoryChange = (value: string | null) => {
	// 	if (!value) return null;
	// 	const _selectedCategory = categories?.body.filter((category) => category.id === parseInt(value, 10))[0];
	// 	if (!_selectedCategory) return null;
	// 	handleCategoryUpdate(_selectedCategory);
	// };

	// useEffect(() => {
	// 	handleCategoryUpdate(categories?.body[0] || null);
	// }, [categories]);

	const toggleProductAdd = () => {
		// setShouldOpenDrawer(true);
		setCrudState("create");
	};

	// const getCategoryData = () => {
	// 	if (!categories) return [];
	// 	return categories.body.map(({ category, id }) => ({ value: id.toString() || "", label: category }));
	// };

	const handleProductEdit = (product: ProductWithRelations) => {
		setShouldOpenDrawer(true);
		setIsProductAdd(false);
		setActiveProduct(product);
	};

	const handleDrawerClose = () => {
		// TODO: Add a warning when trying to close the drawer
		setShouldOpenDrawer(false);
	};

	return (
		<>
			{crudState === "read" && (
				<ProductList
					categories={categories?.body}
					handleProductEdit={handleProductEdit}
					toggleProductAdd={toggleProductAdd}
				/>
			)}
			{/* TODO: Add a loader  */}
			{(crudState === "create" || crudState === "update") && (
				<ProductForm
					isAdd={crudState === "create"}
					product={activeProduct}
					categories={categories?.body}
					onCancel={() => setCrudState("read")}
				/>
			)}
		</>
	);
};

export default ProductContent;
