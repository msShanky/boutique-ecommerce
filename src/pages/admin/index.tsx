import React from "react";
import Head from "next/head";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { AdminLayout } from "@/components/layout";
import { Title } from "@mantine/core";

const AdminPage = () => {
	return (
		<AdminLayout>
			<>
				<Head>
					<title>Breeze Boutique | Admin</title>
				</Head>
				<section className="w-full">
					<Title>Dashboard Content From root</Title>
				</section>
			</>
		</AdminLayout>
	);
};

export default AdminPage;

export const getServerSideProps = withPageAuth({ redirectTo: "/login" });
