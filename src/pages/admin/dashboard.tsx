import { AdminLayout } from "@/components/layout";
import { Navbar, Text, Title } from "@mantine/core";
import Head from "next/head";
import React from "react";

const DashboardPage = () => {
	return (
		<AdminLayout>
			<>
				<Head>
					<title>Breeze Boutique | Admin</title>
				</Head>
				<main className="container flex flex-row m-10 mx-auto space-x-10">
					<section className="w-full">
						<Title>Dashboard Content From Page</Title>
					</section>
				</main>
			</>
		</AdminLayout>
	);
};

export default DashboardPage;
