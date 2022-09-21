import React from "react";
import Head from "next/head";
import { AdminLayout } from "@/components/layout";

// TODO: Optimize the initial data fetching to pre-populate the data from api
const ProductManagementPage = () => {
	return (
		<AdminLayout>
			<>
				<Head>
					<title>Breeze Boutique | Admin Product Management</title>
				</Head>
				<section className="w-full">
					<div>ProductManagementPage</div>
				</section>
			</>
		</AdminLayout>
	);
};

export default ProductManagementPage;
