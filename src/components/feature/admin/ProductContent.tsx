import React, { useState } from "react";
import { LoadingOverlay } from "@mantine/core";
import { useGetProductCategoriesQuery } from "@/reducer/breezeBaseApi";
import { ProductForm } from "@/components/feature";
import { ProductList } from "@/components/common/admin/product";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

const ProductContent = () => {
	const [crudState, setCrudState] = useState<AdminCRUDContent>("read");
	const [activeProduct, setActiveProduct] = useState<ProductWithRelations>();
	const [isProductLoading, setProductLoading] = useState<boolean>(false);

	const { data: categories, isLoading } = useGetProductCategoriesQuery();

	const toggleProductAdd = () => {
		setCrudState("create");
	};

	const handleProductEdit = (product: ProductWithRelations) => {
		setActiveProduct(product);
	};

	const handleProductAdd = async (product: ProductFormStateProps) => {
		setProductLoading(true);
		const { data, error } = await supabaseClient.from("product").insert([product]);
		console.log("The data from the API call is", data);
		console.log("The ERROR from the API call is", error);
		setProductLoading(false);
	};

	return (
		<>
			{(isLoading || isProductLoading) && (
				<div style={{ width: 400, position: "relative" }}>
					<LoadingOverlay visible={isLoading} overlayBlur={2} />
				</div>
			)}
			{crudState === "read" && (
				<ProductList
					categories={categories?.body}
					handleProductEdit={handleProductEdit}
					toggleProductAdd={toggleProductAdd}
				/>
			)}
			{/* TODO: Add a loader  */}
			{/* TODO: Display a success screen after creating a product */}
			{(crudState === "create" || crudState === "update") && (
				<ProductForm
					isAdd={crudState === "create"}
					product={activeProduct}
					categories={categories?.body}
					handleSubmit={(values) => handleProductAdd(values)}
					handleCancel={() => setCrudState("read")}
				/>
			)}
		</>
	);
};

export default ProductContent;
