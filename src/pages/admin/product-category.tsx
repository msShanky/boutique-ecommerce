import React from "react";
import Head from "next/head";
import { AdminLayout } from "@/components/layout";

// TODO: Optimize the initial data fetching to pre-populate the data from api
const ProductCategoryPage = () => {
	return (
		<AdminLayout>
			<>
				<Head>
					<title>Breeze Boutique | Admin Product Category</title>
				</Head>
				<section className="w-full">
					<div>ProductCategoryPage</div>
				</section>
			</>
		</AdminLayout>
	);
};

export default ProductCategoryPage;
