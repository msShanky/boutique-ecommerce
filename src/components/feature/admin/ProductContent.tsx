import React, { useState } from "react";
import { LoadingOverlay } from "@mantine/core";
import { useGetProductCategoriesQuery } from "@/reducer/breezeBaseApi";
import { ProductForm } from "@/components/feature";
import { ProductList } from "@/components/common/admin/product";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { ProductSuccess } from "@/components/common/admin";
import { formatProductFormForUpdate } from "helpers/supabase-helper";
import { definitions } from "types/supabase";

const ProductContent = () => {
	const [crudState, setCrudState] = useState<AdminCRUDContent>("read");
	const [activeProduct, setActiveProduct] = useState<ProductWithRelations>();
	const [productApiState, setProductApiState] = useState<ApiStatus>("idle");
	const { data: categories, isLoading } = useGetProductCategoriesQuery();

	const toggleProductAdd = () => {
		setCrudState("create");
	};

	const handleProductEdit = (product: ProductWithRelations) => {
		setActiveProduct(product);
		setCrudState("update");
	};

	const handleProductUpdate = async (product: ProductWithRelations) => {
		setProductApiState("in-progress");
		if (crudState === "create") {
			const { data, error } = await supabaseClient.from("product").insert([product]);
			if (error) {
				setProductApiState("error");
			} else if (data) {
				setProductApiState("success");
			}
		} else if (crudState === "update") {
			const { data, error } = await supabaseClient
				.from("product")
				.update(formatProductFormForUpdate(product))
				.eq("code", activeProduct?.code);
			if (error) {
				setProductApiState("error");
			} else if (data) {
				setProductApiState("success");
			}
		}
	};

	return (
		<>
			{(isLoading || productApiState === "in-progress") && (
				<div className={"w-full min-h-[85vh] relative bg-violet-light"}>
					<LoadingOverlay visible={true} overlayBlur={2} />
				</div>
			)}
			{crudState === "read" && (
				<ProductList
					categories={categories?.body}
					handleProductEdit={handleProductEdit}
					toggleProductAdd={toggleProductAdd}
				/>
			)}
			{/* TODO: Display a success screen after creating a product */}
			{(crudState === "create" || crudState === "update") &&
				(productApiState === "success" ? (
					<ProductSuccess
						onCancel={() => {
							setCrudState("read");
							setProductApiState("idle");
						}}
					/>
				) : (
					<ProductForm
						isAdd={crudState === "create"}
						product={activeProduct}
						categories={categories?.body}
						handleSubmit={(values) => handleProductUpdate(values)}
						handleCancel={() => setCrudState("read")}
					/>
				))}
		</>
	);
};

export default ProductContent;
