import React, { FunctionComponent, ReactElement } from "react";
import Head from "next/head";
import AppHeader from "../common/AppHeader";
import AppFooter from "../common/AppFooter";
import Link from "next/link";

import { IconBrandFacebook, IconBrandWhatsapp } from "@tabler/icons-react";

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
			<Head>
				<title>{pageTitle}</title>
			</Head>
			<AppHeader menuLinks={menuLinks} isLanding={isLanding} />
			<main className={isLanding ? "mb-32" : "my-32"}>{children}</main>
			<AppFooter menuLinks={menuLinks} />
			<div className="flex-row hidden gap-1 lg:fixed lg:flex md:flex-col bottom-4 md:left-10 left-2">
				<Link passHref legacyBehavior href="https://wa.me/message/YDU5CC6W2247I1">
					<a target="_blank" rel="noreferrer" href="https://wa.me/message/YDU5CC6W2247I1">
						<div className="flex items-center justify-center w-10 h-10 rounded-full md:w-12 md:h-12 bg-secondary">
							<IconBrandWhatsapp className=" stroke-primaryBlack" size={30} />
						</div>
					</a>
				</Link>
				<Link passHref legacyBehavior href="https://www.facebook.com/profile.php?id=100083119281213&mibextid=ZbWKwL">
					<a
						target="_blank"
						rel="noreferrer"
						href="https://www.facebook.com/profile.php?id=100083119281213&mibextid=ZbWKwL"
					>
						<div className="flex items-center justify-center w-10 h-10 rounded-full md:w-12 md:h-12 bg-secondary">
							<IconBrandFacebook className="fill-primaryBlack" />
						</div>
					</a>
				</Link>
			</div>
		</>
	);
};

export default AppLayout;
