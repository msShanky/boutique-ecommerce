import React, { useState } from "react";
import Head from "next/head";
import { Navbar, Text } from "@mantine/core";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { AdminContent } from "@/components/feature";
import { AdminLayout } from "@/components/layout";
import { IconDashboard, IconReportAnalytics, IconShoppingCart, TablerIcon } from "@tabler/icons";

type AdminPanelLink = {
	content: AdminPageContent;
	label: string;
	icon: TablerIcon;
};

const panelLinks: Array<AdminPanelLink> = [
	{ content: "dashboard", label: "Dashboard", icon: IconDashboard },
	{ content: "product", label: "Products", icon: IconShoppingCart },
	{ content: "order", label: "Orders", icon: IconShoppingCart },
	{ content: "report", label: "Reports", icon: IconReportAnalytics },
];

const Admin = () => {
	const [activeMenu, setActiveMenu] = useState<AdminPageContent>("dashboard");

	const links = panelLinks.map((item) => {
		const isActive = activeMenu === item.content;

		return (
			<a
				className={`flex flex-row space-x-6 items-center 
				text-sm px-3 py-2 w-full hover:bg-violet hover:text-white hover:bg-opacity-40 
				${isActive ? "bg-violet text-white bg-opacity-80" : "bg-transparent"} `}
				key={item.label}
				onClick={(event) => {
					event.preventDefault();
					setActiveMenu(item.content);
				}}
			>
				<item.icon stroke={1.5} />
				<span className="self-end">{item.label}</span>
			</a>
		);
	});

	// TODO: Add the sidebar to manage multiple pages
	// TODO: Manage pages orders, products, variants and other shit
	return (
		<AdminLayout>
			<>
				<Head>
					<title>Breeze Boutique | Admin</title>
				</Head>
				<main className="container mx-auto m-10 flex flex-row space-x-10">
					<Navbar className="bg-violet-light border-violet border-r-2" height={840} width={{ sm: 250 }} p="md">
						<Navbar.Section className="mb-6">
							<Text className="text-2xl text-page">Admin</Text>
						</Navbar.Section>
						<Navbar.Section className="space-y-4" grow mt="xl">
							{links}
						</Navbar.Section>
					</Navbar>
					<section className="w-full">
						<AdminContent content={activeMenu} />
					</section>
				</main>
			</>
		</AdminLayout>
	);
};

export default Admin;

export const getServerSideProps = withPageAuth({ redirectTo: "/login" });
