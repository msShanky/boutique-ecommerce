import React, { useState } from "react";
import { LoadingOverlay } from "@mantine/core";
import { useGetProductCategoriesQuery } from "@/reducer/breezeBaseApi";
import { ProductList, ProductManager } from "@/components/common/admin";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { formatProductFormForUpdate } from "helpers/supabase-helper";
import { PostgrestError } from "@supabase/supabase-js";

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

	// TODO: If there is an error when creating a new product delete the image created for the same product
	const handleProductApiResponse = (data: any | null, error: PostgrestError | null) => {
		if (error) {
			setProductApiState("error");
		} else if (data) {
			setProductApiState("success");
		}
	};

	const manageProductVariants = async (product: ProductWithRelations, containsVariant: boolean) => {
		const { variants, id } = product;
		if (!variants || variants.length <= 0) {
			return;
		}
		const variantsBody = variants.map((variant) => {
			return { ...variant, product_id: id };
		});

		if (!containsVariant) {
			const { data: variantsData, error: variantsError } = await supabaseClient
				.from("product_variant")
				.insert(variantsBody);
			handleProductApiResponse(variantsData, variantsError);
		} else {
			console.log(" ===> The product is being edited and already contains variants", variantsBody);
			const newVariants = variantsBody.filter((variant) => !variant.id && variant.sku);
			const variantsForEdit = variantsBody.filter((variant) => variant.id);
			console.log("The new variants to be created are:", newVariants);
			console.log("The variants to be edited are:", variantsForEdit);
			const { data: variantsEditData, error: variantsEditError } = await supabaseClient
				.from("product_variant")
				.upsert(variantsForEdit);
			const { data: variantsCreateData, error: variantsCreateError } = await supabaseClient
				.from("product_variant")
				.insert(newVariants);

			// console.log(" ===> The product edit response for variants", variantsData);
			handleProductApiResponse(variantsEditData, variantsEditError);
		}
	};

	const handleProductAdd = async (product: ProductPostBody) => {
		const { variants, ...coreProduct } = product;
		const { data, error } = await supabaseClient.from("product").insert(coreProduct);
		const doesProductContainsVariants = activeProduct && activeProduct.variants && activeProduct.variants?.length > 0;
		manageProductVariants({ ...product, id: data?.[0].id }, doesProductContainsVariants ?? false);
	};

	const handleProductEdit = async (product: ProductWithRelations) => {
		const { variants, ...coreProduct } = formatProductFormForUpdate(product);
		const { data, error } = await supabaseClient.from("product").update(coreProduct).eq("code", activeProduct?.code);
		const doesProductContainsVariants = activeProduct && activeProduct.variants && activeProduct.variants?.length > 0;
		manageProductVariants(product, doesProductContainsVariants ?? false);
		handleProductApiResponse(data, error);
	};

	const handleProductUpdate = async (product: ProductPostBody | ProductWithRelations) => {
		setProductApiState("in-progress");
		if (crudState === "create") {
			handleProductAdd(product as ProductPostBody);
		} else if (crudState === "update") {
			handleProductEdit(product as ProductWithRelations);
		}
	};

	const handleCancel = () => {
		setCrudState("read");
		setProductApiState("idle");
		setActiveProduct(undefined);
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
