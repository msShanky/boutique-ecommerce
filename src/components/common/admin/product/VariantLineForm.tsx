import { ActionIcon, Button, NumberInput, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IconDice6, IconTrash } from "@tabler/icons";
import React, { ReactElement } from "react";

type VariantLineFormProps = {
	productVariantForm: UseFormReturnType<ProductPostBody>;
	handleCodeGeneration: () => void;
	index: number;
	handleDelete: () => void;
};

const VariantLineForm = (props: VariantLineFormProps): ReactElement => {
	const { productVariantForm, handleCodeGeneration, index, handleDelete } = props;
	const { getInputProps } = productVariantForm;

	return (
		<div className="flex flex-row items-center justify-between gap-4">
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
			{/* FIXME: The count is not populated when editing, get the values from API */}
			<NumberInput placeholder="0" label="Inventory" required {...getInputProps(`variants.${index}.inventory_count`)} />
			<ActionIcon
				className="mt-4 text-white bg-error bg-opacity-80 hover:bg-error hover:bg-opacity-40 "
				onClick={handleDelete}
			>
				<IconTrash size={18} />
			</ActionIcon>
		</div>
	);
};

export default VariantLineForm;
