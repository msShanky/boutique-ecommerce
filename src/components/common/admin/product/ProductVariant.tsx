import { Button, Text } from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import { IconPlus } from "@tabler/icons";
import React, { FunctionComponent, ReactElement, useState } from "react";

import { customAlphabet } from "nanoid";
import { VariantLineForm } from ".";
import { definitions } from "types/supabase";

const nanoid = customAlphabet("1234567890", 10);

type ProductVariantProps = {
	variants: Array<ProductVariantPost>;
	product: any;
	isAdd: boolean;
	productForm: UseFormReturnType<Omit<ProductWithRelations, "id">>;
};

const ProductVariant: FunctionComponent<ProductVariantProps> = (props) => {
	const { isAdd, productForm } = props;
	// const [localVariants, setLocalVariants] = useState<Array<ProductVariantPost>>(variants);

	const { values } = productForm;

	const handleVariantAdd = () => {
		// setLocalVariants([...localVariants, ]);
		const variantLength = values.variants?.length;
		productForm.setFieldValue(`variants.${variantLength}`, { sku: undefined, size: "", inventory_count: undefined });
	};

	const handleSKUGeneration = (index: number) => {
		const sku = parseInt(nanoid(), 10);
		productForm.setFieldValue(`variants.${index}.sku`, sku);
	};

	return (
		<div className="space-y-6">
			{values.variants && values.variants?.length > 0 ? (
				values.variants.map((variant, index) => {
					const key = variant.sku;
					return (
						<VariantLineForm
							key={key}
							isAdd={isAdd}
							productVariantForm={productForm}
							handleCodeGeneration={() => handleSKUGeneration(index)}
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
