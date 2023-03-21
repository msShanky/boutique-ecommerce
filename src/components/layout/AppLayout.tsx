import React, { FunctionComponent, ReactElement } from "react";
import Head from "next/head";
import AppHeader from "../common/AppHeader";
import AppFooter from "../common/AppFooter";

type AppLayoutProps = {
	children: ReactElement;
	isContained?: boolean;
	menuLinks?: Array<any>;
	isLanding?: boolean;
	pageTitle: string;
};

const AppLayout: FunctionComponent<AppLayoutProps> = (props) => {
	const { children, menuLinks, isLanding, pageTitle } = props;
	return (
		<>
			<AppHeader menuLinks={menuLinks} isLanding={isLanding} />
			<Head>
				<title>{pageTitle}</title>
			</Head>
			<main className={isLanding ? "mb-32" : "my-32"}>{children}</main>
			<AppFooter menuLinks={menuLinks} />
		</>
	);
};

export default AppLayout;
