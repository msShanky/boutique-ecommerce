import { Button, Text } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IconPlus } from "@tabler/icons";
import React, { FunctionComponent, useState } from "react";

import { customAlphabet } from "nanoid";
import { VariantLineForm } from ".";

import { DeleteWarningModal } from "../warning";

const nanoid = customAlphabet("1234567890", 10);

type ProductVariantProps = {
	variants: Array<ProductVariantPost>;
	product: any;
	productForm: UseFormReturnType<Omit<ProductWithRelations, "id">>;
	handleVariantDelete: (index: number) => void;
};

const ProductVariant: FunctionComponent<ProductVariantProps> = (props) => {
	const { productForm, handleVariantDelete } = props;
	const [opened, setOpened] = useState<boolean>(false);
	const [variantIndex, setVariantIndex] = useState<number | null>(null);

	const { values, setFieldValue } = productForm;

	const handleVariantAdd = () => {
		const variantLength = values.variants?.length;
		setFieldValue(`variants.${variantLength}`, { sku: undefined, size: "", inventory_count: undefined });
	};

	const handleVariantDeleteConfirmation = async () => {
		handleVariantDelete(variantIndex as number);
		setTimeout(() => {
			setOpened(false);
		}, 150);
	};

	const handleInlineDeleteToggle = (index: number) => {
		setOpened(true);
		setVariantIndex(index);
	};

	const handleSKUGeneration = (index: number) => {
		const sku = parseInt(nanoid(), 10);
		setFieldValue(`variants.${index}.sku`, sku);
	};

	return (
		<div className="space-y-6">
			<DeleteWarningModal
				modelType="variant"
				onDelete={handleVariantDeleteConfirmation}
				opened={opened}
				toggleOpen={setOpened}
			/>
			{values.variants && values.variants?.length > 0 ? (
				values.variants.map((variant, index) => {
					const key = variant.sku;
					return (
						<VariantLineForm
							key={key}
							productVariantForm={productForm}
							handleCodeGeneration={() => handleSKUGeneration(index)}
							handleDelete={() => handleInlineDeleteToggle(index)}
							index={index}
						/>
					);
				})
			) : (
				<Text className="font-sans text-lg text-page">No Variants Found, Would you like to create one ?</Text>
			)}
			<Button
				onClick={handleVariantAdd}
				className="bg-transparent border-2 border-dashed text-violet border-violet hover:bg-transparent hover:border-black hover:text-black"
			>
				<IconPlus />
			</Button>
		</div>
	);
};

export default ProductVariant;
