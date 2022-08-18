import React, { FunctionComponent } from "react";
import { Button, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { definitions } from "types/supabase";

type ProductFormProps = {
	isAdd: boolean;
	product?: ProductWithRelations;
	categories?: Array<definitions["product_category"]>;
};

const initialFormState = {
	code: "",
	msrp: 0,
	title: "",
	sub_title: "",
	product_discount: 0,
	category_id: "",
};

const getFormInitialState = (product: ProductWithRelations | undefined) => {
	if (!product) return initialFormState;
	return { ...product };
};

const getCategoryData = (categories: Array<definitions["product_category"]> | undefined) => {
	if (!categories) return [];
	// The category dropdown is using the id in the product form for API compatibility
	return categories.map((category) => ({ value: category?.id || "", label: category?.category }));
};

const ProductForm: FunctionComponent<ProductFormProps> = (props) => {
	const { isAdd, product, categories } = props;
	const addProductForm = useForm({ initialValues: getFormInitialState(product) });

	// TODO: Handle the product images
	// TODO: Handle product variant
	// TODO: Show the selling price in the form

	return (
		<form className="flex flex-col space-y-2" onSubmit={addProductForm.onSubmit((values) => console.log(values))}>
			<TextInput label="Product Code" placeholder="123456" required {...addProductForm.getInputProps("code")} />
			<Select
				className="inline-block w-3/12"
				label="Category"
				required
				{...addProductForm.getInputProps("category_id")}
				data={getCategoryData(categories)}
			/>
			<TextInput placeholder="350" label="MSRP" type="number" required {...addProductForm.getInputProps("msrp")} />
			<TextInput placeholder="Kalini" label="Product Title" required {...addProductForm.getInputProps("title")} />
			<TextInput
				placeholder="Women Teal Yoke Design Kurta with Palazzos &amp; With Dupatta"
				label="Product Subtitle"
				required
				{...addProductForm.getInputProps("sub_title")}
			/>
			<TextInput
				placeholder="10"
				label="Product Discount"
				type="number"
				required
				{...addProductForm.getInputProps("product_discount")}
			/>
			<Button variant="outline" type="submit">
				{isAdd ? "Add" : "Edit"} Product
			</Button>
		</form>
	);
};

export default ProductForm;
