import Link from "next/link";
import React, { FunctionComponent, useEffect, useState } from "react";

import { cartQuantitySelector } from "@/reducer/cart";

import { Text, Drawer, Container, Group, Header, Image, Burger } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconHeart, IconShoppingCart } from "@tabler/icons";
import { useAppSelector } from "app/hooks";
import { HoverMenuItem, LinkIcon, MobileMenu } from "./header";
import { useUser } from "@supabase/auth-helpers-react";
import { UserAvatar } from "./user";
import { useRouter } from "next/router";

// import { getUserProfileFromGoogle } from "@/helpers/authHelper";

const HEADER_HEIGHT = 100;

type AppHeaderProps = {
	isAdmin?: boolean;
	menuLinks?: Array<MenuLinkPropTypes>;
	isLanding?: boolean;
};

const AppHeader: FunctionComponent<AppHeaderProps> = (props) => {
	const [opened, { toggle, close }] = useDisclosure(false);	
	const { user, isLoading: userLoading } = useUser();
	const rootState = useAppSelector((state) => state);
	const router = useRouter();

	const cartItemCount = cartQuantitySelector(rootState);

	const { menuLinks } = props;

	const isMobile = useMediaQuery("(max-width: 600px)");

	// Closes the drawer when a user is redirected
	useEffect(() => {
		close();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router]);

	const menuItem = (label: string) => {
		return (
			<Text
				className={`md:flex flex-col justify-between hover:text-primary lg:text-white md:text-primaryBlack hover:cursor-pointer hover:underline`}
			>
				{label}
			</Text>
		);
	};

	const menuItems =
		menuLinks &&
		menuLinks.map((item, index) => {
			const uniqueKey = `${(index + 48) * 146}_menu_item`;
			if (item.categories.length > 0) return <HoverMenuItem key={uniqueKey} categoryItem={item} />;
		});

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
							<UserAvatar handleToggle={() => console.log("The user button is clicked")} user={user} theme="black" />
						) : (
							<Link href="/login">{menuItem("login")}</Link>
						)}
						<LinkIcon icon={<IconHeart size={20} className="stroke-white" />} link="/wishlist" label="WishList" />
						{/* TODO: [2] [Prod_mvp] the cart dock count should be based on the total quantity  */}
						<LinkIcon
							icon={<IconShoppingCart size={25} className="stroke-white" />}
							link="/cart"
							dockCount={cartItemCount}
						/>
					</Group>
				</div>
				<div className="flex gap-8 md:hidden">
					<LinkIcon
						icon={<IconShoppingCart size={25} className="stroke-white" />}
						link="/cart"
						dockCount={cartItemCount}
					/>
					<LinkIcon icon={<IconHeart size={25} className="stroke-white" />} link="/wishlist" />
					<Burger opened={opened} onClick={toggle} className="md:hidden" color="#fff" size="md" />
					<Drawer
						withCloseButton={false}
						opened={opened}
						onClose={toggle}
						position="top"
						size="100%"
						closeOnClickOutside
					>
						<MobileMenu handleClose={toggle} menuLinks={menuLinks} />
					</Drawer>
				</div>
			</Container>
		</Header>
	);
};

export default AppHeader;
