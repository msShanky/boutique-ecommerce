import React from "react";
import Link from "next/link";
import { Button } from "@mantine/core";
import SearchInput from "./header/SearchInput";

const appLinks = [
	{ link: "/", label: "Home" },
	{ link: "/pages", label: "Pages" },
	{ link: "/products", label: "Products" },
	{ link: "/shop", label: "Shop" },
	{ link: "/contact", label: "Contact" },
];

const AppNavigation = () => {
	return (
		<section className="container flex flex-row items-center justify-between w-full h-16 p-2 pt-4 mx-auto bg-white">
			<div className="flex flex-row items-center space-x-24">
				<h1 className="text-4xl font-bold ">Logo</h1>
				<div className="space-x-8 font-sans text-base ">
					{appLinks.map(({ link, label }) => {
						const uniqueKey = `APP_LINK_KEY_${label}`;
						return (
							<Link key={uniqueKey} href={link} passHref>
								<Button
									className="hover:text-pink active:text-pink text-dark-blue bg-none hover:bg-transparent"
									component="a"
								>
									{label}
								</Button>
							</Link>
						);
					})}
				</div>
			</div>
			<SearchInput />
		</section>
	);
};

export default AppNavigation;
