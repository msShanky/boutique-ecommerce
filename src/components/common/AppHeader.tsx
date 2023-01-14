import React, { FunctionComponent, useEffect, useState } from "react";
import Link from "next/link";
import { Burger, Container, Group, Header, Image } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import SearchInput from "./input/Search";

const HEADER_HEIGHT = 100;

type AppHeaderProps = {
	isAdmin?: boolean;
	menuLinks?: Array<any>;
};

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

const AppHeader: FunctionComponent<AppHeaderProps> = (props) => {
	const [opened, { toggle }] = useDisclosure(false);
	const [active, setActive] = useState(0);
	const [scrollY, setScrollY] = useState(0);

	const isMobile = useMediaQuery("(max-width: 600px)");
	// const { menuLinks } = props;

	const menuItems =
		staticMenuLinks &&
		staticMenuLinks.map((item, index) => {
			const uniqueKey = `${(index + 48) * 146}_menu_item`;
			return (
				<Link key={uniqueKey} href={item.link} passHref>
					<span
						key={item.label}
						className={`h-[${HEADER_HEIGHT}px] md:flex flex-col justify-between hidden hover:text-primaryAlt/70 text-white hover:cursor-pointer`}
						onClick={(event) => {
							// event.preventDefault();
							setActive(index);
						}}
					>
						{item.label}
					</span>
				</Link>
			);
		});

	const handleScroll = () => {
		const pageYPosition = window.pageYOffset;
		setScrollY(pageYPosition);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<Header
			height={HEADER_HEIGHT}
			className={`fixed transition-colors z-10 w-full mx-auto border-none ${
				scrollY > 650 ? `bg-primaryBlack/90` : `bg-transparent`
			}`}
		>
			<Container className="container flex items-start justify-between px-6 py-4 md:items-center md:px-4">
				<Link href="/" passHref>
					<Image
						width={isMobile ? 55 : 75}
						className="hover:cursor-pointer"
						src="/images/breeze_logo_v2_white.svg"
						alt="Breeze Logo"
					/>
				</Link>
				<div className={"md:flex flex-row gap-8 hidden"}>
					<Group spacing={0} position="right" className={"mr-4 gap-6"}>
						{menuItems}
					</Group>
					{/* <SearchInput /> */}
					{/* TODO: Add the wishlist and login button */}
				</div>
				<Burger opened={opened} onClick={toggle} className={"md:hidden"} color="#fff" size="md" />
			</Container>
		</Header>
	);
};

export default AppHeader;
