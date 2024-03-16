import React from "react";
import Head from "next/head";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { AdminLayout } from "@/components/layout";
import { Title } from "@mantine/core";
import { useGetDashboardDataQuery } from "@/reducer/breezeAdminApi";
import { DetailedSection } from "@/components/feature/admin/dashboard";

const AdminPage = () => {
	const { isLoading, data } = useGetDashboardDataQuery();

	console.log("The data from the backend ", data);
	return (
		<AdminLayout>
			<>
				<Head>
					<title>Breeze Boutique | Admin</title>
				</Head>
				<section className="flex flex-col w-full gap-6 mb-40">
					{isLoading ? <p>Loading...</p> : <DetailedSection data={data} />}
				</section>
			</>
		</AdminLayout>
	);
};

export default AdminPage;

export const getServerSideProps = withPageAuth({ redirectTo: "/login" });
