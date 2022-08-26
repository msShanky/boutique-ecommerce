import React, { FunctionComponent, ReactElement } from "react";
import { AppHeader, AppFooter } from "@/components/common";

type AppLayoutProps = {
	children: ReactElement;
	isContained?: boolean;
};

const AdminLayout: FunctionComponent<AppLayoutProps> = ({ children }) => {
	return (
		<>
			<AppHeader isAdmin />
			<main>{children}</main>
			<AppFooter />
		</>
	);
};

export default AdminLayout;
