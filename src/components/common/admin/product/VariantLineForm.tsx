import { Button, NumberInput, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IconDice6 } from "@tabler/icons";
import React, { ReactElement } from "react";
import { definitions } from "types/supabase";

type VariantLineFormProps = {
	productVariantForm: UseFormReturnType<ProductPostBody>;
	isAdd: boolean;
	handleCodeGeneration: () => void;
	// variant: AdminFormVariant;
	index: number;
};

const VariantLineForm = (props: VariantLineFormProps): ReactElement => {
	const { isAdd, productVariantForm, handleCodeGeneration, index } = props;
	const { values, getInputProps } = productVariantForm;

	const lineValue = values.variants?.[index];

	return (
		<div className="flex flex-row justify-between gap-4">
			<TextInput
				label="SKU"
				className="w-5/12"
				classNames={{
					input: "tracking-widest rounded-r-md",
					rightSection: "w-12",
				}}
				placeholder="00000000"
				required
				readOnly
				rightSection={
					<Button
						onClick={handleCodeGeneration}
						unstyled
						className="flex items-center justify-center w-full text-white rounded-r-md bg-violet hover:bg-pink hover:bg-opacity-80 h-9"
					>
						<IconDice6 />
					</Button>
				}
				{...getInputProps(`variants.${index}.sku`)}
			/>
			<TextInput placeholder="L" label="Product Size" required {...getInputProps(`variants.${index}.size`)} />
			<NumberInput placeholder="0" label="Inventory" required {...getInputProps(`variants.${index}.inventory_count`)} />
		</div>
	);
};

export default VariantLineForm;
