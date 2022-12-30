import React, { useCallback, useEffect, useState } from "react";
import { AdminLayout } from "@/components/layout";
import Head from "next/head";
import { OrderTable } from "@/components/feature/admin/order/table";
import { useLazyGetOrdersQuery } from "@/reducer/breezeBaseApi";
import OrderFilter from "@/components/feature/admin/order/forms/OrderFilter";
import { OrderData, OrderFilterFormValues } from "@/components/feature/admin/order/types";
import { Pagination } from "@mantine/core";
import { Loader } from "@mantine/core";

const PAGE_ITEMS = 10;

// TODO: Optimize the initial data fetching to pre-populate the data from api
const OrderManagementPage = () => {
	const [filters, setFilters] = useState<OrderFilterFormValues>({});
	const [currentPage, setCurrentPage] = useState(1)
	const [getOrders, orderResponse] = useLazyGetOrdersQuery();
	const { data: ordersData, isLoading, isSuccess } = orderResponse;

	const maxPages = Math.ceil((parseInt(`${ordersData?.count}`) || 0) / PAGE_ITEMS);


	const refreshOrders = useCallback((filters: OrderFilterFormValues) => {
		const from = ((currentPage - 1) * (PAGE_ITEMS));
		const to = (currentPage * PAGE_ITEMS) - 1;
		getOrders({ from, to, ...filters });
	}, [getOrders, currentPage]);

	useEffect(() => {
		refreshOrders(filters);
	}, [refreshOrders]);

	const handleFilterChange = (values: OrderFilterFormValues, _event: React.FormEvent<HTMLFormElement>) => {
		setFilters(values);
		refreshOrders(values);
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
				{ordersData?.body
					? <OrderTable data={ordersData.body} refreshData={()=>refreshOrders(filters)} />
					: <div className="flex justify-center w-full h-56 mt-20">
						<Loader size={60} />
					</div>
				}
				<Pagination
					page={currentPage}
					onChange={setCurrentPage}
					total={maxPages}
					radius="xl"
					withEdges
					className="mt-10"
					position="center"
					styles={() => ({
						item: {
							'&[data-active]': {
								backgroundColor: '#7E33E0'
							}
						}
					})}
				/>

			</>
		</AdminLayout>
	);
};

export default OrderManagementPage;
