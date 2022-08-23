import React, { FunctionComponent, useState } from "react";
import { Button, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { definitions } from "types/supabase";
import { getCategoryData } from "helpers/supabase-helper";
import { IconX } from "@tabler/icons";
import { ImageUploader, ImageViewer } from "@/components/common/admin";
import { customAlphabet } from "nanoid";
import { getSellingPriceFromDiscount } from "helpers/price-calculator";
const nanoid = customAlphabet("1234567890", 8);

type ProductFormProps = {
	isAdd: boolean;
	product?: ProductWithRelations;
	categories?: Array<definitions["product_category"]>;
	onCancel: () => void;
};

const initialFormState = {
	code: "",
	msrp: null,
	title: "",
	sub_title: "",
	product_discount: null,
	category_id: "",
};

const getFormInitialState = (product: ProductWithRelations | undefined) => {
	if (!product) return initialFormState;
	return { ...product };
};

const ProductForm: FunctionComponent<ProductFormProps> = (props) => {
	const { isAdd, product, categories, onCancel } = props;
	const [productCode, setProductCode] = useState<string | null>();
	const { setFieldValue, onSubmit, getInputProps, values } = useForm({
		initialValues: getFormInitialState(product),
		validate: {
			code: (value: string) => {
				return value.length < 8
					? "The code must be 8 characters"
					: value.length > 8
					? "The code must 8 characters no more no less"
					: null;
			},
		},
	});

	// TODO: Handle the product images
	// TODO: Handle product variant
	// TODO: Show the selling price in the form

	const handleProductCodeGeneration = () => {
		console.log(" CODE GEN: ", nanoid());
		setProductCode(nanoid());
		setFieldValue("code", nanoid());
	};

	return (
		<form className="grid grid-cols-2 gap-5 " onSubmit={onSubmit((values) => console.log(values))}>
			<section className="">
				<ImageUploader isDisabled={!productCode} />
				<ImageViewer />
			</section>
			<section className="flex flex-col space-y-4">
				<div className="flex items-end space-x-4">
					{/* TODO: Add Validation that the value must be all numeric and should always be 8 digits */}
					<TextInput
						label="Product Code"
						className="w-9/12"
						classNames={{
							input: "tracking-widest",
						}}
						placeholder="00000000"
						required
						{...getInputProps("code")}
					/>
					{isAdd && (
						<Button
							disabled={!!productCode}
							onClick={handleProductCodeGeneration}
							className="bg-violet hover:bg-pink hover:bg-opacity-80"
						>
							Generate Code
						</Button>
					)}
				</div>
				<div className="flex items-center justify-between gap-4">
					<Select
						className="inline-block w-6/12"
						label="Category"
						placeholder="Select a category"
						required
						{...getInputProps("category_id")}
						data={getCategoryData(categories)}
					/>
					<TextInput
						className="w-6/12"
						placeholder="350"
						label="MRP"
						type="number"
						required
						{...getInputProps("msrp")}
					/>
				</div>
				<TextInput placeholder="Kalini" label="Product Title" required {...getInputProps("title")} />
				<TextInput
					placeholder="Women Teal Yoke Design Kurta with Palazzos &amp; With Dupatta"
					label="Product Subtitle"
					required
					{...getInputProps("sub_title")}
				/>
				<div className="flex items-center gap-4">
					<TextInput
						placeholder="10"
						label="Product Discount"
						className="w-6/12"
						type="number"
						required
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
						label="Product Price"
						type="number"
					/>
				</div>
			</section>
			<div className="flex space-x-4">
				<Button leftIcon={<IconX />} onClick={onCancel} variant="filled" className="bg-error" type="reset">
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
