import React, { useCallback, useEffect, useState } from "react";
import { AdminLayout } from "@/components/layout";
import Head from "next/head";
import { OrderTable } from "@/components/feature/admin/order/table";
import { useLazyGetOrdersQuery } from "@/reducer/breezeBaseApi";
import OrderFilter from "@/components/feature/admin/order/forms/OrderFilter";
import { OrderData, OrderFilterFormValues } from "@/components/feature/admin/order/types";
import { definitions } from "types/supabase";

// TODO: Optimize the initial data fetching to pre-populate the data from api
const OrderManagementPage = () => {
	const [orders, setOrders] = useState<OrderData[]>([]);
	const [filters, setFilters] = useState<OrderFilterFormValues>({});
	const [getOrders, orderResponse] = useLazyGetOrdersQuery();

	const refreshOrders = useCallback(() => {
		getOrders();
	}, [getOrders]);

	useEffect(() => {
		refreshOrders();
	}, [refreshOrders]);

	useEffect(() => {
		if (orderResponse.isSuccess && orderResponse?.data?.body) {
			let filteredOrders = orderResponse.data.body;
			if (Object.keys(filters).length) {
				filteredOrders = orderResponse.data.body.filter((order) => {
					for (const filter in filters) {
						const filterKey = filter as keyof definitions["user_order"];
						return !filters[filterKey] || order[filterKey] === filters[filterKey];
					}
				});
			}
			setOrders(filteredOrders);
		}
	}, [filters, orderResponse]);

	const handleFilterChange = (values: OrderFilterFormValues, _event: React.FormEvent<HTMLFormElement>) => {
		setFilters(values);
		refreshOrders();
	};

	return (
		<AdminLayout>
			<>
				<Head>
					<title>Breeze Boutique | Admin</title>
				</Head>
				<section className="w-full">
					<div>OrderManagement</div>
				</section>
				<OrderFilter values={filters} onSubmit={handleFilterChange} />
				<OrderTable data={orders} refreshData={refreshOrders} />
			</>
		</AdminLayout>
	);
};

export default OrderManagementPage;
