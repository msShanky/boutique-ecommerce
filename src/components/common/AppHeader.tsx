import React, { FunctionComponent, useState } from "react";
import { Anchor, Burger, Container, Group, Header, Image, createStyles } from "@mantine/core";
import Link from "next/link";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import SearchInput from "./input/Search";

const useStyles = createStyles((theme) => {
	carousalImage: {
	}
});

const HEADER_HEIGHT = 84;

type AppHeaderProps = {
	isAdmin?: boolean;
	menuLinks?: Array<any>;
};

const AppHeader: FunctionComponent<AppHeaderProps> = (props) => {
	const [opened, { toggle }] = useDisclosure(false);
	const [active, setActive] = useState(0);
	const isMobile = useMediaQuery("(max-width: 600px)");
	const { menuLinks } = props;

	console.log("responsive check ===> ", isMobile);

	const menuItems =
		menuLinks &&
		menuLinks.map((item, index) => {
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

	return (
		<Header height={HEADER_HEIGHT} className="fixed z-10 w-full mx-auto bg-transparent border-none">
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
					<SearchInput />
					{/* TODO: Add the wishlist and login button */}
				</div>
				<Burger opened={opened} onClick={toggle} className={"md:hidden"} color="#fff" size="md" />
			</Container>
		</Header>
	);
};

export default AppHeader;
