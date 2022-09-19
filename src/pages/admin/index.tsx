import React, { MouseEvent, useState } from "react";
import Head from "next/head";
import { Navbar, Text } from "@mantine/core";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { AdminContent } from "@/components/feature";
import { AdminLayout } from "@/components/layout";
import { IconCategory, IconDashboard, IconReportAnalytics, IconShoppingCart, TablerIcon } from "@tabler/icons";
import { SidePanelMenuLink } from "@/components/common/admin";

const panelLinks: Array<AdminPanelLink> = [
	{ content: "dashboard", label: "Dashboard", icon: IconDashboard },
	{ content: "product", label: "Products", icon: IconShoppingCart },
	{ content: "category", label: "Category", icon: IconCategory },
	{ content: "order", label: "Orders", icon: IconShoppingCart },
	{ content: "report", label: "Reports", icon: IconReportAnalytics },
];

const AdminPage = () => {
	const [activeMenu, setActiveMenu] = useState<AdminPageContent>("dashboard");

	const handleMenuClick = (event: MouseEvent<HTMLAnchorElement>, item: AdminPanelLink) => {
		event.preventDefault();
		setActiveMenu(item.content);
	};

	const links = panelLinks.map((item) => {
		const isActive = activeMenu === item.content;
		return <SidePanelMenuLink item={item} key={item.label} isActive={isActive} handleMenuClick={handleMenuClick} />;
	});

	return (
		<AdminLayout>
			<>
				<Head>
					<title>Breeze Boutique | Admin</title>
				</Head>
				{/* <main className="container flex flex-row m-10 mx-auto space-x-10">
					<Navbar className="border-r-2 bg-violet-light border-violet" height={840} width={{ sm: 250 }} p="md">
						<Navbar.Section className="mb-6">
							<Text className="text-2xl text-page">Admin</Text>
						</Navbar.Section>
						<Navbar.Section className="space-y-4" grow mt="xl">
							{links}
						</Navbar.Section>
					</Navbar> */}
				{/* <section className="w-full"> */}
				{/* <AdminContent content={activeMenu} /> */}
				{/* </section>
				</main> */}
			</>
		</AdminLayout>
	);
};

export default AdminPage;

export const getServerSideProps = withPageAuth({ redirectTo: "/login" });
