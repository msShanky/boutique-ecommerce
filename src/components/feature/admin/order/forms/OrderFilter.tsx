import React from "react";
import { useForm } from "@mantine/form";
import { Select, Button, Group } from "@mantine/core";
import { useOrderStatus } from "../hooks";
import { OrderFilterFormValues } from "../types";

interface OrderFilterProps {
	onSubmit: (values: OrderFilterFormValues, event: React.FormEvent<HTMLFormElement>) => void;
	values: OrderFilterFormValues;
}

const OrderFilter = (props: OrderFilterProps) => {
	const orderStatusOptions = useOrderStatus();

	const { onSubmit, values } = props;

	const orderFilterForm = useForm<OrderFilterFormValues>({
		initialValues: values,
	});


	return (
		<form
			className="my-4 space-y-8"
			onSubmit={orderFilterForm.onSubmit(onSubmit)}
			onReset={() => {
				orderFilterForm.reset();
				orderFilterForm.setFieldValue("status_id", undefined);
			}}
		>
			<Group>
				<Select
					styles={() => ({
						root: {
							display: "flex",
							alignItems: "center",
						},
						label: {
							marginRight: "10px",
						},
						rightSection: {
							color: "black",
						},
					})}
					clearable
					iconWidth={24}
					{...orderFilterForm.getInputProps("status_id")}
					label="Order Status"
					placeholder="None"
					data={orderStatusOptions}
				/>
				<Button
					className="text-black bg-primary hover:bg-secondary"
					type="submit"
					disabled={!orderFilterForm.isDirty()}
				>
					Apply
				</Button>
			</Group>
		</form>
	);
};

export default OrderFilter;
