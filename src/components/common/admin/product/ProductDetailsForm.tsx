import React, { FunctionComponent } from "react";
import { Button, NumberInput, Select, Textarea, TextInput } from "@mantine/core";
import { getCategoryData } from "helpers/supabase-helper";
import { getSellingPriceFromDiscount } from "helpers/price-calculator";
import { UseFormReturnType } from "@mantine/form";
import { definitions } from "types/supabase";

type ProductDetailsFormProps = {
	productForm: UseFormReturnType<ProductPostBody>;
	isAdd: boolean;
	handleCodeGeneration: () => void;
	categories?: Array<definitions["product_category"]>;
};

const ProductDetailsForm: FunctionComponent<ProductDetailsFormProps> = (props) => {
	const { productForm, isAdd, categories, handleCodeGeneration } = props;
	const { values, getInputProps } = productForm;

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
		</>
	);
};

export default ProductDetailsForm;
