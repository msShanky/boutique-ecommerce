import React from "react";
import Head from "next/head";
import { AdminLayout } from "@/components/layout";

// TODO: Optimize the initial data fetching to pre-populate the data from api
const AdminReportPage = () => {
	return (
		<AdminLayout>
			<>
				<Head>
					<title>Breeze Boutique | Admin Report</title>
				</Head>
				<section className="w-full">
					<div>AdminReportPage</div>
				</section>
			</>
		</AdminLayout>
	);
};

export default AdminReportPage;
