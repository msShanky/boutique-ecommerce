import React, { FunctionComponent, ReactElement } from "react";
import AppHeader from "../common/AppHeader";
import AppFooter from "../common/AppFooter";

type AppLayoutProps = {
	children: ReactElement;
};

const AppLayout: FunctionComponent<AppLayoutProps> = ({ children }) => {
	return (
		<>
			<AppHeader />
			<main>{children}</main>
			<AppFooter />
		</>
	);
};

export default AppLayout;
