import React, { FunctionComponent, ReactElement } from "react";
import AppHeader from "../common/AppHeader";
import AppFooter from "../common/AppFooter";

type AppLayoutProps = {
	children: ReactElement;
	isContained?: boolean;
	menuLinks: Array<any>;
	isLanding?: boolean;
};

const AppLayout: FunctionComponent<AppLayoutProps> = ({ children, menuLinks, isLanding }) => {
	return (
		<>
			<AppHeader menuLinks={menuLinks} isLanding={isLanding} />
			<main className={isLanding ? "mb-32": "my-32"}>{children}</main>
			<AppFooter />
		</>
	);
};

export default AppLayout;
