import React from "react";
import { AdminLayout } from "@/components/layout";
import Head from "next/head";

// TODO: Optimize the initial data fetching to pre-populate the data from api
const OrderManagementPage = () => {
	return (
		<AdminLayout>
			<>
				<Head>
					<title>Breeze Boutique | Admin</title>
				</Head>
				<section className="w-full">
					<div>OrderManagement</div>
				</section>
			</>
		</AdminLayout>
	);
};

export default OrderManagementPage;
