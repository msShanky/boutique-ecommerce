import React, { FunctionComponent, useEffect, useState } from "react";
import { Button, NumberInput, SegmentedControl, Select, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { definitions } from "types/supabase";
import { IconX } from "@tabler/icons";
import { ImageUploader, ImageViewer, ProductDetailsForm, ProductVariant } from "@/components/feature/admin";

import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { formatProductFormForUpdate } from "helpers/supabase-helper";

type ProductFormProps = {
	isAdd: boolean;
	product?: ProductWithRelations;
	categories?: Array<definitions["product_category"]>;
	handleCancel: () => void;
	handleSubmit: (values: ProductPostBody) => void;
};

const initialFormState: ProductPostBody = {
	code: undefined,
	images: [],
	category_id: undefined,
	description: "",
	title: "",
	sub_title: "",
	purchase_price: undefined,
	msrp: undefined,
	product_discount: undefined,
	variants: [],
};

const getFormInitialState = (product: ProductWithRelations | undefined) => {
	if (!product) return initialFormState;
	return { ...product };
};

const ProductForm: FunctionComponent<ProductFormProps> = (props) => {
	const { isAdd, product, categories, handleCancel, handleSubmit } = props;
	const [productFormState, setProductFormState] = useState<AdminProductFormView>("product-info");
	const [productVariantDeleteState, setProductVariantDeleteState] = useState<ApiStatus>("idle");
	// TODO: Add Form validation for all fields that has to be validated
	const productForm = useForm({
		initialValues: getFormInitialState(product),
	});
	const { setFieldValue, onSubmit, values, removeListItem } = productForm;

	const handleImageSuccess = (value: string) => {
		// setProductImages([...productImages, value]);
		setFieldValue("images", [...(values.images as Array<string>), value]);
	};

	// TODO: Update the product images array when deleting the product images
	const handleImageDelete = async (index: number) => {
		const localCopy = [...(values.images as string[])];
		localCopy.splice(index, 1);
		const imageUrl = values.images?.[index] as string;
		removeListItem("images", index);
		await supabaseClient.storage.from("product-images").remove([imageUrl]);
		const { variants, images, ...coreProduct } = formatProductFormForUpdate(values);
		await supabaseClient
			.from("product")
			.update({ ...coreProduct, images: localCopy })
			.eq("code", values?.code);
	};

	const handleVariantDelete = async (index: number) => {
		const localCopyVariants = values.variants ? [...values.variants] : [];
		localCopyVariants.splice(index, 1);
		setFieldValue(`variants`, localCopyVariants);
		const variantToDelete = values?.variants?.[index];
		console.log("The variant to delete is", variantToDelete);
		if (!variantToDelete || !variantToDelete.sku) return;

		setProductVariantDeleteState("in-progress");
		const { data, error } = await supabaseClient.from("product_variant").delete().eq("id", variantToDelete.id);
		if (error) {
			setProductVariantDeleteState("error");
		} else if (data) {
			setProductVariantDeleteState("success");
		}
	};

	const handleFormCancel = async () => {
		if (values.images) {
			await supabaseClient.storage.from("product-images").remove(values.images as string[]);
			handleCancel();
		}
	};

	// useEffect(() => {
	// 	setProductImages((product?.images as string[]) ?? []);
	// }, [product]);

	return (
		<form className="grid grid-cols-2 gap-5" onSubmit={onSubmit((values) => handleSubmit(values))}>
			<section className="flex flex-col">
				<ImageUploader isDisabled={!values.code} handleImageSuccess={handleImageSuccess} code={values.code as number} />
				<ImageViewer productImages={values.images as string[]} handleImageDelete={handleImageDelete} />
			</section>
			{/* Product Information Section */}
			<section className="flex flex-col space-y-4">
				<SegmentedControl
					className="w-6/12"
					value={productFormState}
					onChange={(value) => setProductFormState(value as AdminProductFormView)}
					classNames={{
						labelActive: "bg-violet text-white hover:text-white",
						root: "bg-violet-light",
					}}
					data={[
						{ label: "Product Info", value: "product-info" },
						{ label: "Variants", value: "product-variant" },
					]}
				/>
				{productFormState === "product-info" && (
					<ProductDetailsForm productForm={productForm} isAdd={isAdd} categories={categories} />
				)}
				{productFormState === "product-variant" && (
					<ProductVariant
						productForm={productForm}
						variants={product?.variants as Array<ProductVariantPost>}
						product={values}
						handleVariantDelete={handleVariantDelete}
					/>
				)}
			</section>
			<div className="flex justify-end col-start-2 mt-12 space-x-4">
				<Button leftIcon={<IconX />} onClick={handleFormCancel} variant="filled" className="bg-error" type="reset">
					Cancel
				</Button>
				<Button variant="outline" type="submit">
					{isAdd ? "Add" : "Edit"} Product
				</Button>
			</div>
		</form>
	);
};

export default ProductForm;
