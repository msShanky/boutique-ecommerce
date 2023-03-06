import Link from "next/link";
import React, { FunctionComponent, useEffect, useState } from "react";

import { Text, Burger, Container, Group, Header, Image, Menu, Button } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconHeart, IconShoppingCart } from "@tabler/icons";
import { useAppSelector } from "app/hooks";
import { HoverMenuItem, LinkIcon } from "./header";
import { useUser } from "@supabase/auth-helpers-react";
import { UserAvatar } from "./user";

// import { getUserProfileFromGoogle } from "@/helpers/authHelper";

const HEADER_HEIGHT = 100;

type AppHeaderProps = {
	isAdmin?: boolean;
	menuLinks?: Array<MenuLinkPropTypes>;
	isLanding?: boolean;
};

const AppHeader: FunctionComponent<AppHeaderProps> = (props) => {
	const [opened, { toggle }] = useDisclosure(false);
	const [scrollY, setScrollY] = useState(0);
	const { user, isLoading: userLoading } = useUser();
	const { products } = useAppSelector((state) => state.cart);

	const { isLanding, menuLinks } = props;

	const isMobile = useMediaQuery("(max-width: 600px)");

	const menuItem = (label: string) => {
		return (
			<Text className={`md:flex flex-col justify-between hidden hover:text-primary text-white hover:cursor-pointer`}>
				{label}
			</Text>
		);
	};

	const menuItems =
		menuLinks &&
		menuLinks.map((item, index) => {
			const uniqueKey = `${(index + 48) * 146}_menu_item`;
			return <HoverMenuItem key={uniqueKey} categoryItem={item} />;
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

	// const headerBgStyle = scrollY > 650 ? `bg-primaryBlack/90` : isLanding ? `bg-primaryBlack/10` : `bg-primaryBlack/60`;

	return (
		<Header
			height={HEADER_HEIGHT}
			className={`fixed transition-colors z-10 w-full mx-auto border-none bg-primaryBlack/80`}
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
				<div className="flex-row hidden gap-12 md:flex">
					<Group position="right" className={"mr-4 gap-6"}>
						{menuItems}
					</Group>
					<Group position="right" className={"mr-4 gap-6"}>
						{user && !userLoading ? (
							<UserAvatar handleToggle={() => console.log("The user button is clicked")} user={user} />
						) : (
							<Link href="/login">{menuItem("login")}</Link>
						)}
						<LinkIcon icon={<IconHeart size={20} className="stroke-white" />} link="/wishlist" label="WishList" />
						<LinkIcon
							icon={<IconShoppingCart size={25} className="stroke-white" />}
							link="/cart"
							dockCount={products.length}
						/>
					</Group>
				</div>
				<Burger opened={opened} onClick={toggle} className={"md:hidden"} color="#fff" size="md" />
			</Container>
		</Header>
	);
};

export default AppHeader;
