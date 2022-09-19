import React, { FunctionComponent, MouseEvent, ReactElement, useEffect, useState } from "react";
import { AppHeader, AppFooter } from "@/components/common";
import { Navbar, Text } from "@mantine/core";
import { SidePanelMenuLink } from "../common/admin";
import { IconCategory, IconDashboard, IconReportAnalytics, IconShoppingCart } from "@tabler/icons";
import { useRouter } from "next/router";

type AppLayoutProps = {
	children: ReactElement;
	isContained?: boolean;
};

const panelLinks: Array<AdminPanelLink> = [
	{ content: "dashboard", label: "Dashboard", icon: IconDashboard, link: "" },
	{ content: "product", label: "Products", icon: IconShoppingCart, link: "product-management" },
	{ content: "category", label: "Category", icon: IconCategory, link: "product-category" },
	{ content: "order", label: "Orders", icon: IconShoppingCart, link: "order-management" },
	{ content: "report", label: "Reports", icon: IconReportAnalytics, link: "report" },
];

// TODO: Move the sidebar to the layout component so that it can be used on all the admin pages.
const AdminLayout: FunctionComponent<AppLayoutProps> = ({ children }) => {
	const [activeMenu, setActiveMenu] = useState<AdminPanelLink | undefined>();
	const router = useRouter();

	const handleMenuClick = (event: MouseEvent<HTMLAnchorElement>, item: AdminPanelLink) => {
		event.preventDefault();
		setActiveMenu(item);
		router.push(`/admin/${item.link}`);
	};

	useEffect(() => {
		const activeMenu = panelLinks.filter((link) => {
			const routeName = router.route.split("/admin/")[1];
			return link.link === routeName;
		});

		if (activeMenu) {
			setActiveMenu(activeMenu[0]);
			return;
		}

		setActiveMenu(panelLinks[0]);
	}, [router]);

	const links = panelLinks.map((item) => {
		const isActive = activeMenu?.content === item.content;
		const routeName = router.route.split("/admin/")[1];
		const isLinkActive = activeMenu?.link === routeName;
		return <SidePanelMenuLink item={item} key={item.label} isActive={isActive} handleMenuClick={handleMenuClick} />;
	});

	return (
		<>
			<AppHeader isAdmin />
			<main className="container flex flex-row m-10 mx-auto space-x-10">
				<Navbar className="border-r-2 bg-violet-light border-violet" height={840} width={{ sm: 250 }} p="md">
					<Navbar.Section className="mb-6">
						<Text className="text-2xl text-page">Admin</Text>
					</Navbar.Section>
					<Navbar.Section className="space-y-4" grow mt="xl">
						{links}
					</Navbar.Section>
				</Navbar>
				<section className="w-full">{children}</section>
			</main>
			<AppFooter />
		</>
	);
};

export default AdminLayout;
