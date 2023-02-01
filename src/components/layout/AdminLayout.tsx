import React, { FunctionComponent, MouseEvent, ReactElement, useEffect, useState } from "react";
import Link from "next/link";
import { Navbar, Text, Container, Image } from "@mantine/core";

import { SidePanelMenuLink } from "../feature/admin";
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
			if (!routeName) return true;
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
		return <SidePanelMenuLink item={item} key={item.label} isActive={isActive} handleMenuClick={handleMenuClick} />;
	});

	return (
		<>
			<Container className="container flex items-start justify-between px-6 py-4 md:items-center md:px-4">
				<Link href="/admin" passHref>
					<div className="flex items-center gap-4">
						<Image width={30} className="hover:cursor-pointer" src="/images/breeze_logo_v2.svg" alt="Breeze Logo" />
						<Text>Breeze Boutique</Text>
					</div>
				</Link>
				<Link href="/" passHref>
					Go Back Live
				</Link>
			</Container>
			<main className="container flex flex-row mx-auto mt-2">
				<Navbar className="border-r-4 border-black bg-primary" height={840} width={{ sm: 250 }} p="md">
					<Navbar.Section className="mb-6">
						<Text className="text-2xl text-black">Admin</Text>
					</Navbar.Section>
					<Navbar.Section className="space-y-4" grow mt="xl">
						{links}
					</Navbar.Section>
				</Navbar>
				<section className="flex flex-row w-full ml-8">{children}</section>
			</main>
		</>
	);
};

export default AdminLayout;
