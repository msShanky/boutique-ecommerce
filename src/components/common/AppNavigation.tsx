import React from "react";
import Link from "next/link";
import { Button, Image } from "@mantine/core";
import SearchInput from "./input/Search";

const appLinks = [
	{ link: "/", label: "Home" },
	{ link: "/products", label: "Products" },
	{ link: "/cart", label: "Cart" },
	{ link: "/contact", label: "Contact" },
];

const AppNavigation = () => {
	return (
		<section className="container flex flex-row items-center justify-between w-full h-16 p-2 pt-4 mx-auto bg-white">
			<div>
				<Link href="/" passHref>
					<Image className="hover:cursor-pointer" width={50} src="/images/breeze_logo_v2.svg" alt="Breeze Logo" />
				</Link>
			</div>
			<div className="flex-row items-center justify-end hidden space-x-8 md:flex ">
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
				<SearchInput />
			</div>
		</section>
	);
};

export default AppNavigation;
