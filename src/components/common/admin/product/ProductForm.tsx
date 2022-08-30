import React, { FunctionComponent, useEffect, useState } from "react";
import { Button, NumberInput, SegmentedControl, Select, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { definitions } from "types/supabase";
import { IconX } from "@tabler/icons";
import { ImageUploader, ImageViewer, ProductDetailsForm, ProductVariant } from "@/components/common/admin";
import { customAlphabet } from "nanoid";

import { supabaseClient } from "@supabase/auth-helpers-nextjs";
const nanoid = customAlphabet("1234567890", 8);

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
	const [productImages, setProductImages] = useState<Array<string>>([]);
	// TODO: Add Form validation for all fields that has to be validated
	const productForm = useForm({
		initialValues: getFormInitialState(product),
	});

	const { setFieldValue, onSubmit, values } = productForm;

	// TODO: Handle product variant
	// TODO: Show the selling price in the form

	const handleProductCodeGeneration = () => {
		setFieldValue("code", parseInt(nanoid(), 10));
	};

	const handleImageSuccess = (value: string) => {
		setProductImages([...productImages, value]);
		setFieldValue("images", [...productImages, value]);
	};

	// TODO: Update the product images array when deleting the product images
	const handleImageDelete = async (index: number) => {
		const localCopy = [...productImages];
		const imageUrl = localCopy[index];
		await supabaseClient.storage.from("product-images").remove([imageUrl]);
		localCopy.splice(index, 1);
		setProductImages(localCopy);
		setFieldValue("images", productImages);
	};

	const handleFormCancel = async () => {
		await supabaseClient.storage.from("product-images").remove(productImages);
		handleCancel();
	};

	useEffect(() => {
		setProductImages((product?.images as string[]) ?? []);
	}, [product]);

	console.log(" +++++++++ PRODUCT ", product);
	console.log(" +++++++++ FORM VALUES ==========> ", values);

	return (
		<form className="grid grid-cols-2 gap-5" onSubmit={onSubmit((values) => handleSubmit(values))}>
			<section className="flex flex-col">
				<ImageUploader
					isDisabled={!values.code}
					handleImageSuccess={handleImageSuccess}
					formValues={values as ProductFormStateProps}
				/>
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
					<ProductDetailsForm
						productForm={productForm}
						handleCodeGeneration={handleProductCodeGeneration}
						isAdd={isAdd}
						categories={categories}
					/>
				)}
				{productFormState === "product-variant" && (
					<ProductVariant
						productForm={productForm}
						isAdd={isAdd}
						variants={product?.variants as Array<ProductVariantPost>}
						product={values}
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
