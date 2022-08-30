import React, { FunctionComponent, useEffect, useState } from "react";
import { Button, NumberInput, Select, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { definitions } from "types/supabase";
import { getCategoryData } from "helpers/supabase-helper";
import { IconX } from "@tabler/icons";
import { ImageUploader, ImageViewer } from "@/components/common/admin";
import { customAlphabet } from "nanoid";
import { getSellingPriceFromDiscount } from "helpers/price-calculator";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
const nanoid = customAlphabet("1234567890", 8);

type ProductFormProps = {
	isAdd: boolean;
	product?: ProductWithRelations;
	categories?: Array<definitions["product_category"]>;
	handleCancel: () => void;
	handleSubmit: (values: ProductWithRelations) => void;
};

// const initialFormState: ProductFormStateProps = {
// 	code: null,
// 	images: [],
// 	category_id: "",
// 	description: "",
// 	title: "",
// 	sub_title: "",
// 	purchase_price: "",
// 	msrp: null,
// 	product_discount: null,
// };
const initialFormState: definitions["product"] = {
	id: 0,
	code: undefined,
	images: [],
	category_id: undefined,
	description: "",
	title: "",
	sub_title: "",
	purchase_price: undefined,
	msrp: undefined,
	product_discount: undefined,
};

const getFormInitialState = (product: ProductWithRelations | undefined) => {
	if (!product) return initialFormState;
	return { ...product };
	// return { ...product, category_id: product.category_id?.toString() ?? "" };
};

const ProductForm: FunctionComponent<ProductFormProps> = (props) => {
	const { isAdd, product, categories, handleCancel, handleSubmit } = props;
	// const [isLoading, setLoading] = useState<boolean>(false);
	const [productImages, setProductImages] = useState<Array<string>>([]);
	const { setFieldValue, onSubmit, getInputProps, values, errors } = useForm({
		initialValues: getFormInitialState(product),
		// TODO: Add Form validation for all fields that has to be validated
		validate: {
			// code: (value: number) => {
			// 	return value.length < 8
			// 		? "The code must be 8 characters"
			// 		: value.length > 8
			// 		? "The code must 8 characters no more no less"
			// 		: null;
			// },
		},
	});

	// TODO: Handle the product images
	// TODO: Handle product variant
	// TODO: Show the selling price in the form

	const handleProductCodeGeneration = () => {
		// setProductCode(nanoid());
		setFieldValue("code", parseInt(nanoid(), 10));
	};

	const handleImageSuccess = (value: string) => {
		setProductImages([...productImages, value]);
		setFieldValue("images", [...productImages, value]);
	};

	const handleImageDelete = async (index: number) => {
		const localCopy = [...productImages];
		const imageUrl = localCopy[index];
		// setLoading(true);
		await supabaseClient.storage.from("product-images").remove([imageUrl]);
		localCopy.splice(index, 1);
		// setLoading(false);
		setProductImages(localCopy);
		setFieldValue("images", productImages);
	};

	const handleFormCancel = async () => {
		// TODO: Delete all the images which were not synced
		await supabaseClient.storage.from("product-images").remove(productImages);
		handleCancel();
	};

	useEffect(() => {
		// setProductCode(product?.code?.toString());
		setProductImages((product?.images as string[]) ?? []);
	}, [product]);

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
				<TextInput
					label="Product Code"
					className="w-full"
					classNames={{
						input: "tracking-widest",
					}}
					placeholder="00000000"
					required
					readOnly
					rightSection={
						isAdd && (
							<Button
								disabled={!!values.code}
								onClick={handleProductCodeGeneration}
								className="bg-violet hover:bg-pink hover:bg-opacity-80 h-9"
							>
								Generate Code
							</Button>
						)
					}
					{...getInputProps("code")}
				/>
				{/* <div className={`flex  space-x-4 ${!!errors["code"] ? "items-center" : "items-end"}`}> </div> */}
				<TextInput placeholder="Kalini" label="Product Title" required {...getInputProps("title")} />
				<TextInput
					placeholder="Women Teal Yoke Design Kurta with Palazzos &amp; With Dupatta"
					label="Product Subtitle"
					required
					{...getInputProps("sub_title")}
				/>
				<Textarea placeholder="Product Description" label="Product Description" {...getInputProps("description")} />
				<div className="flex items-center justify-between gap-4">
					<Select
						className="inline-block w-full"
						label="Category"
						placeholder="Select a category"
						required
						{...getInputProps("category_id")}
						data={getCategoryData(categories)}
					/>
				</div>
				<div className="flex items-end justify-between gap-4">
					<NumberInput
						className="w-6/12"
						placeholder="350"
						label="Purchase Price"
						description="Visible only for Admin"
						type="number"
						required
						step={5}
						{...getInputProps("purchase_price")}
					/>
					<NumberInput
						className="w-6/12"
						placeholder="350"
						label="MRP"
						type="number"
						required
						step={5}
						{...getInputProps("msrp")}
					/>
				</div>
				<div className="flex items-center gap-4">
					<NumberInput
						placeholder="10"
						label="Product Discount"
						className="w-6/12"
						type="number"
						step={1}
						{...getInputProps("product_discount")}
					/>
					<TextInput
						className="w-6/12 border-none"
						classNames={{
							wrapper: "select-none",
							input: "border-none bg-violet-light text-page tracking-widest",
						}}
						value={getSellingPriceFromDiscount(values.msrp ?? 0, values.product_discount ?? 0)}
						readOnly
						placeholder="10"
						label="Selling Price"
						type="number"
					/>
				</div>
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
