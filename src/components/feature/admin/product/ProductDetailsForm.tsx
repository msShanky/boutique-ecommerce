import React, { FunctionComponent, useEffect } from "react";
import { Button, NumberInput, Select, Textarea, TextInput } from "@mantine/core";
import { getCategoryData } from "helpers/supabase-helper";
import { getSellingPriceFromDiscount } from "helpers/price-calculator";
import { UseFormReturnType } from "@mantine/form";
import { definitions } from "types/supabase";
import { customAlphabet } from "nanoid";
import {
	useGetGenderGroupQuery,
	useLazyGetCategoriesByGenderIdQuery,
	useLazyGetNodeCategoryByCategoryIdQuery,
	useLazyGetSubCategoryByCategoryIdQuery,
} from "@/reducer/breezeAdminApi";
import ProductVariant from "./ProductVariant";
const nanoid = customAlphabet("1234567890", 8);

type ProductDetailsFormProps = {
	productForm: UseFormReturnType<ProductPostBody>;
	isAdd: boolean;
	categories?: Array<definitions["product_category"]>;
	variants: Array<ProductVariantPost>;
	handleVariantDelete: (index: number) => void;
};

const ProductDetailsForm: FunctionComponent<ProductDetailsFormProps> = (props) => {
	const { productForm, isAdd, variants, handleVariantDelete } = props;
	const { values, getInputProps, setFieldValue } = productForm;
	const { data: genderGroupData, isSuccess } = useGetGenderGroupQuery();
	const [getCategoriesByGenderId, { data: categoriesData, isSuccess: categoriesSuccess }] =
		useLazyGetCategoriesByGenderIdQuery();
	const [getSubCategoriesByCategoryId, { data: subCategoriesData, isSuccess: subCategoriesSuccess }] =
		useLazyGetSubCategoryByCategoryIdQuery();
	const [getNodeCategoriesByCategoryId, nodeCategoriesResponse] = useLazyGetNodeCategoryByCategoryIdQuery();

	useEffect(() => {
		if (values.gender_group_id) {
			getCategoriesByGenderId(values.gender_group_id);
		}
	}, [values.gender_group_id, getCategoriesByGenderId]);

	useEffect(() => {
		if (values.category_id) {
			getSubCategoriesByCategoryId(values.category_id);
		}
	}, [values.category_id, getSubCategoriesByCategoryId]);

	useEffect(() => {
		if (values.sub_category_id) {
			getNodeCategoriesByCategoryId(values.sub_category_id);
		}
	}, [values.sub_category_id, getNodeCategoriesByCategoryId]);

	const handleCodeGeneration = () => {
		setFieldValue("code", parseInt(nanoid(), 10));
	};

	const constructPageLink = (): string => {
		const isDataAvailable = !values.title || !values.sub_title || !values.code;
		if (isDataAvailable) return `No parameters to create product link`;
		const parsedTitle = values.title?.trim()?.toLowerCase().replaceAll(" ", "-");
		const parsedSubTitle = values.sub_title?.trim().toLowerCase().replaceAll(" ", "-");
		const pageLink = `${parsedTitle}-${parsedSubTitle}-${values.code}`;

		return pageLink;
	};

	useEffect(() => {
		setFieldValue("page_link", constructPageLink());
	}, [values]);

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
							className="bg-primary hover:bg-primaryAlt hover:text-primary text-primaryBlack hover:bg-opacity-80 h-9"
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
			<TextInput placeholder="Product link" label="Product Link" readOnly {...getInputProps("page_link")} />
			{/* <TextInput placeholder="Product link" label="Product Link" readOnly value={constructPageLink()} /> */}
			<Textarea autosize minRows={6} placeholder="Product Description" label="Product Description" {...getInputProps("description")} />
			<div className="flex items-center justify-between gap-4">
				{isSuccess && genderGroupData && (
					<Select
						className="inline-block w-full"
						label="Gender"
						placeholder="Select a gender"
						required
						value={values.gender_group_id?.toString()}
						onChange={(event) => {
							setFieldValue("gender_group_id", parseInt(event as string, 10));
							setFieldValue("category_id", undefined);
							setFieldValue("sub_category_id", undefined);
						}}
						data={genderGroupData?.map(({ id, gender }) => {
							return { value: id.toString(), label: gender };
						})}
					/>
				)}
				{values.gender_group_id && categoriesSuccess && categoriesData && (
					<Select
						className="inline-block w-full"
						label="Categories"
						placeholder="Select a category"
						required
						value={values.category_id?.toString()}
						onChange={(event) => {
							setFieldValue("category_id", parseInt(event as string, 10));
							setFieldValue("sub_category_id", undefined);
						}}
						data={categoriesData.map(({ id, category }) => {
							return { value: id.toString(), label: category };
						})}
					/>
				)}
				{values.category_id && subCategoriesSuccess && subCategoriesData && (
					<Select
						className="inline-block w-full"
						label="Sub Category"
						placeholder="Select a sub category"
						value={values.sub_category_id?.toString()}
						onChange={(event) => setFieldValue("sub_category_id", parseInt(event as string, 10))}
						data={subCategoriesData?.map(({ id, name }) => {
							return { value: id.toString(), label: name };
						})}
					/>
				)}
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

			<div className="flex flex-col gap-6 mt-20">
				<h2 className="text-xl font-light">Product Variants</h2>
				<ProductVariant
					productForm={productForm}
					variants={variants}
					product={values}
					handleVariantDelete={handleVariantDelete}
				/>
			</div>
		</>
	);
};

export default ProductDetailsForm;
