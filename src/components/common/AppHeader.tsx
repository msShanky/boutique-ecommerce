import Link from "next/link";
import React, { FunctionComponent, useEffect } from "react";

import { cartQuantitySelector } from "@/reducer/cart";

import { Text, Drawer, Container, Group, Header, Image, Burger } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconHeart, IconShoppingCart } from "@tabler/icons";
import { useAppSelector } from "app/hooks";
import { HoverMenuItem, LinkIcon, MobileMenu } from "./header";
import { useUser } from "@supabase/auth-helpers-react";
import { UserAvatar } from "./user";
import { useRouter } from "next/router";
import { IconLogout, IconTruckDelivery, IconPhone } from "@tabler/icons-react";

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
				// className={`md:flex flex-col justify-between hover:text-primary lg:text-white hover:cursor-pointer hover:underline`}
				className="text-base text-white md:text-xs lg:text-base"
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
					<div className="flex items-start gap-4 md:items-center">
						<Image
							width={isMobile ? 55 : 75}
							className="select-none hover:cursor-pointer"
							src="/images/breeze_logo_v2_white.svg"
							alt="Breeze Logo"
						/>
						<Text className="w-24 font-sans text-base font-light select-none lg:text-3xl md:text-xl md:w-36 text-primary drop-shadow-2xl shadow-primary">
							Breeze Boutique
						</Text>
					</div>
				</Link>
				<div className="flex-row justify-end hidden gap-12 md:w-6/12 lg:w-11/12 lg:flex">
					<Group position="right" className="gap-1 mr-4 md:gap-2 lg:gap-6">
						{user && !userLoading ? (
							<UserAvatar handleToggle={() => null} user={user} theme="black" />
						) : (
							<Link href="/login">{menuItem("login")}</Link>
						)}
						{user && !userLoading && (
							<LinkIcon
								icon={<IconLogout size={20} className="stroke-primary fill-primaryBlack" />}
								link="/api/auth/logout"
								label="logout"
							/>
						)}
						{user && !userLoading && (
							<LinkIcon
								icon={<IconTruckDelivery size={20} className="stroke-primary fill-primaryBlack" />}
								link="/user/orders"
								label="Orders"
							/>
						)}
						<LinkIcon
							icon={<IconHeart size={20} className="stroke-primary fill-primaryBlack" />}
							link="user/wishlist"
							label="WishList"
						/>
						<LinkIcon
							icon={<IconPhone size={20} className="stroke-primary fill-primaryBlack" />}
							link="/contact-us"
							label="Contact Us"
						/>
						<LinkIcon
							icon={<IconTruckDelivery size={20} className="stroke-primary fill-primaryBlack" />}
							link="/user/orders"
							label="Orders"
						/>
						{/* TODO: [2] [Prod_mvp] the cart dock count should be based on the total quantity  */}
						<LinkIcon
							icon={<IconShoppingCart size={25} className="stroke-primary fill-primaryBlack" />}
							link="/cart"
							dockCount={cartItemCount}
						/>
					</Group>
				</div>
				<div className="flex items-center gap-8 lg:hidden">
					{!user && !userLoading && <Link href="/login">{menuItem("login")}</Link>}
					<LinkIcon
						icon={<IconShoppingCart size={25} className="stroke-primary fill-primaryBlack" />}
						link="/cart"
						dockCount={cartItemCount}
					/>
					<Burger opened={opened} onClick={toggle} className="lg:hidden" color="#fff" size="md" />
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
