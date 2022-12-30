import React, { FunctionComponent, ReactElement } from "react";
import AppHeader from "../common/AppHeader";
import AppFooter from "../common/AppFooter";

type AppLayoutProps = {
	children: ReactElement;
	isContained?: boolean;
	menuLinks: Array<any>;
};

const AppLayout: FunctionComponent<AppLayoutProps> = ({ children, menuLinks }) => {
	return (
		<>
			<AppHeader menuLinks={menuLinks} />
			<main>{children}</main>
			<AppFooter />
		</>
	);
};

export default AppLayout;
