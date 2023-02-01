import React, { FunctionComponent } from "react";
import { Button, NumberInput, Select, Textarea, TextInput } from "@mantine/core";
import { getCategoryData } from "helpers/supabase-helper";
import { getSellingPriceFromDiscount } from "helpers/price-calculator";
import { UseFormReturnType } from "@mantine/form";
import { definitions } from "types/supabase";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890", 8);

type ProductDetailsFormProps = {
	productForm: UseFormReturnType<ProductPostBody>;
	isAdd: boolean;
	categories?: Array<definitions["product_category"]>;
};

const ProductDetailsForm: FunctionComponent<ProductDetailsFormProps> = (props) => {
	const { productForm, isAdd, categories } = props;
	const { values, getInputProps, setFieldValue } = productForm;

	const categoryList = getCategoryData(categories);

	const handleCodeGeneration = () => {
		setFieldValue("code", parseInt(nanoid(), 10));
	};

	return (
		<>
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
							onClick={handleCodeGeneration}
							className="bg-violet hover:bg-pink hover:bg-opacity-80 h-9"
						>
							Generate Code
						</Button>
					)
				}
				{...getInputProps("code")}
			/>
			<TextInput placeholder="Kalini" label="Product Title" required {...getInputProps("title")} />
			<TextInput
				placeholder="Women Teal Yoke Design Kurta with Palazzos &amp; With Dupatta"
				label="Product Subtitle"
				required
				{...getInputProps("sub_title")}
			/>
			<Textarea placeholder="Product Description" label="Product Description" {...getInputProps("description")} />
			<div className="flex items-center justify-between gap-4">
				{/* FIXME: Category id is not changing when selecting new category from dropdown */}
				<Select
					className="inline-block w-full"
					label="Category"
					placeholder="Select a category"
					required
					value={values.category_id?.toString()}
					onChange={(event) => setFieldValue("category_id", parseInt(event as string, 10))}
					data={categoryList}
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
						input: "border-none bg-violet-light text-primary tracking-widest",
					}}
					value={getSellingPriceFromDiscount(values.msrp ?? 0, values.product_discount ?? 0)}
					readOnly
					placeholder="10"
					label="Selling Price"
					type="number"
				/>
			</div>
		</>
	);
};

export default ProductDetailsForm;
