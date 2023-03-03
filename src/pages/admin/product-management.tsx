import React from "react";
import Head from "next/head";
import { AdminLayout } from "@/components/layout";
import { ProductContent } from "@/components/feature";

// TODO: Optimize the initial data fetching to pre-populate the data from api
const ProductManagementPage = () => {
	return (
		<AdminLayout>
			<>
				<Head>
					<title>BB | Product Management</title>
				</Head>
				<section className="w-full pb-12">
					<ProductContent />
				</section>
			</>
		</AdminLayout>
	);
};

export default ProductManagementPage;
