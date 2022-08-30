import React, { useState } from "react";
import { LoadingOverlay } from "@mantine/core";
import { useGetProductCategoriesQuery } from "@/reducer/breezeBaseApi";
import { ProductForm, ProductList, ProductManager } from "@/components/common/admin";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { ProductSuccess } from "@/components/common/admin";
import { formatProductFormForUpdate } from "helpers/supabase-helper";

const ProductContent = () => {
	const [crudState, setCrudState] = useState<AdminCRUDContent>("read");
	const [activeProduct, setActiveProduct] = useState<ProductWithRelations>();
	const [productApiState, setProductApiState] = useState<ApiStatus>("idle");
	const { data: categories, isLoading } = useGetProductCategoriesQuery();

	const toggleProductAdd = () => {
		setCrudState("create");
	};

	const toggleProductEdit = (product: ProductWithRelations) => {
		setActiveProduct(product);
		setCrudState("update");
	};

	const handleProductAdd = async (product: Omit<ProductWithRelations, "id">) => {
		console.log(" *** PRODUCT TO ADD =====>   ", product);
		// const { data, error } = await supabaseClient.from("product").insert([product]);
		// if (error) {
		// 	setProductApiState("error");
		// } else if (data) {
		// 	setProductApiState("success");
		// }
	};

	const handleProductEdit = async (product: Omit<ProductWithRelations, "id">) => {
		console.log(" *** PRODUCT TO EDIT *** =====>   ", product);
		// const { data, error } = await supabaseClient
		// 	.from("product")
		// 	.update(formatProductFormForUpdate(product))
		// 	.eq("code", activeProduct?.code);
		// if (error) {
		// 	setProductApiState("error");
		// } else if (data) {
		// 	setProductApiState("success");
		// }
	};

	const handleProductUpdate = async (product: Omit<ProductWithRelations, "id">) => {
		setProductApiState("in-progress");
		if (crudState === "create") {
			handleProductAdd(product);
		} else if (crudState === "update") {
			handleProductEdit(product);
		}
	};

	const handleCancel = () => {
		setCrudState("read");
		setProductApiState("idle");
	};

	const shouldShowLoader = isLoading || productApiState === "in-progress";
	const shouldShowForm = (crudState === "create" || crudState === "update") && !shouldShowLoader;

	if (shouldShowLoader) {
		return (
			<div className={"w-full min-h-[85vh] relative bg-violet-light"}>
				<LoadingOverlay visible={true} overlayBlur={2} />
			</div>
		);
	}

	// Display the list of products if the state is read
	if (crudState === "read" && !shouldShowLoader) {
		return (
			<ProductList
				categories={categories?.body}
				toggleProductEdit={toggleProductEdit}
				toggleProductAdd={toggleProductAdd}
			/>
		);
	}

	// Returns the product form for managing the product edit and add
	return (
		<>
			{shouldShowForm && (
				<ProductManager
					handleCancel={handleCancel}
					productApiState={productApiState}
					categories={categories?.body}
					activeProduct={activeProduct as ProductWithRelations}
					crudState={crudState}
					handleProductUpdate={handleProductUpdate}
				/>
			)}
		</>
	);
};

export default ProductContent;
