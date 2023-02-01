import { Button, Text, TextInput, Title, Image } from "@mantine/core";
import Link from "next/link";
import React from "react";

const staticMenuLinks = [
	{
		label: "Men",
		link: "/shop/men",
	},
	{
		label: "Women",
		link: "/shop/women",
	},
	{
		label: "Kids",
		link: "/shop/kids",
	},
];

const AppHeader = () => {
	return (
		<footer className="w-full bg-primary h-[532px] pl-8 md:pl-0">
			<section className="container flex flex-col gap-12 pt-24 mx-auto md:flex-row md:gap-20">
				<div className="flex flex-col w-1/3 gap-y-4">
					<Image
						src="/images/breeze_logo_v2.svg"
						width={80}
						alt="Breeze Boutique Logo"
						className="text-2xl text-primary"
					>
						Logo
					</Image>
					<Text>Contact Info</Text>
					<Text>care@breezeboutique.in</Text>
				</div>
				<div>
					<Title className="text-2xl font-semibold text-primaryBlack">Categories</Title>
					<div className="flex flex-col mt-8 text-primary text-opacity-30 gap-y-4">
						{staticMenuLinks.map((menuLink, index) => {
							const uniqueLinkKey = `${(index + 88) * 44}_menu_link_${menuLink.label}`;
							return (
								<Link href={menuLink.link} passHref key={uniqueLinkKey}>
									<Text className="font-sans text-xl text-primaryAlt hover:cursor-pointer hover:underline">{menuLink.label}</Text>
								</Link>
							);
						})}
					</div>
				</div>
			</section>
		</footer>
	);
};

export default AppHeader;
