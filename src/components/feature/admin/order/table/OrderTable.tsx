import { useSetOrderStatusMutation } from "@/reducer/breezeBaseApi";
import { Table, Text, Modal } from "@mantine/core";
import { FormErrors } from "@mantine/form";
import React, { useState } from "react";
import { OrderEdit } from "../forms";
import { OrderData, OrderEditFormValues } from "../types";
import OrderTableHeader from "./OrderTableHeader";

interface OrderTableProps {
	data: OrderData[];
	refreshData: () => void;
}

const getNestedObjectValue = (obj: any, key: string) => {
	const keys = key.split(".");
	let finalValue: any | string = obj;
	for (let k of keys) {
		if (typeof finalValue === "object") {
			finalValue = finalValue[k];
		}
	}
	return finalValue;
};

const getDateString = (date: string) => {
	return new Date(date).toLocaleDateString();
};

const OrderTable = ({ data, refreshData }: OrderTableProps) => {
	const [editOpen, setEditOpen] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState<OrderData>(data[0]);
	const [setOrderStatus, { isLoading, data: orderData, isSuccess, isError }] = useSetOrderStatusMutation();

	const tableHeaders = [
		{ key: "id", title: "ID", span: 1 },
		{ key: "created_at", title: "Created At", span: 2, isDate: true },
		{ key: "code", title: "Code", span: 3 },
		{ key: "status.status_text", title: "Order Status", span: 2 },
		// { key: 'payment_ref', title: 'Payment Info', span: 2 },
		{ key: "shipment_ref", title: "Shipment Info", span: 2 },
	];

	const orderOnClick = (order_id: number) => {
		const [order] = data.filter(({ id }) => id === order_id);
		setSelectedOrder(order);
		setEditOpen(true);
	};

	const handleModalClose = () => {
		setEditOpen(false);
		refreshData();
	};

	const rows = data
		? data.map((row) => (
				<tr
					className="hover:bg-violet hover:text-white hover:opacity-50"
					key={row.id}
					onClick={() => orderOnClick(row.id)}
				>
					{tableHeaders.map((headerData) => {
						const { key, span, isDate } = headerData;
						const value = getNestedObjectValue(row, key);
						return (
							<td key={`TABLE_VALUE_${key}`} colSpan={span}>
								{isDate ? getDateString(value) : value}
							</td>
						);
					})}
				</tr>
		  ))
		: [];

	const handleOrderStatusChange = (values: OrderEditFormValues, _event: React.FormEvent<HTMLFormElement>) => {
		setOrderStatus(values);
		handleModalClose();
		refreshData();
	};

	const handleOrderEditError = (
		error: FormErrors,
		_values: OrderEditFormValues,
		_event: React.FormEvent<HTMLFormElement>
	) => {
		console.log(error, "ON ERROR/Reject");
	};

	return (
		<>
			<Modal opened={editOpen} onClose={handleModalClose} title="Order Details" size="lg">
				<OrderEdit
					orderDetails={selectedOrder}
					onSubmit={handleOrderStatusChange}
					onError={handleOrderEditError}
					isLoading={isLoading}
					isSuccess={isSuccess}
					isError={isError}
				/>
			</Modal>
			<Table horizontalSpacing="md" verticalSpacing="xs" sx={{ tableLayout: "fixed", minWidth: 700 }}>
				<thead>
					<tr>
						{tableHeaders.map((header, index) => {
							const { title, span } = header;
							return (
								<OrderTableHeader colSpan={span} key={`${title}-${index + 1}`}>
									{title}
								</OrderTableHeader>
							);
						})}
					</tr>
				</thead>
				<tbody>
					{rows.length > 0 ? (
						rows
					) : (
						<tr>
							<td colSpan={12}>
								<Text weight={500} transform="uppercase" color="red" align="center">
									No Orders found
								</Text>
							</td>
						</tr>
					)}
				</tbody>
			</Table>
		</>
	);
};

export default OrderTable;
