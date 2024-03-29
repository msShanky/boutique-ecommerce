import React, { FC } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { UserAvatar } from "../user";
import Link from "next/link";
import { Text, ActionIcon, Accordion } from "@mantine/core";
import { IconHeart, IconLogout, IconTruckDelivery, IconX } from "@tabler/icons-react";
import { getCategoryLink, getSubCategoryLink } from "@/helpers/supabase-helper";
import LinkIcon from "./LinkIcon";
import { IconPhone } from "@tabler/icons";

type MobileMenuProps = {
	handleClose: () => void;
	menuLinks?: Array<MenuLinkPropTypes>;
};

export const MobileMenu: FC<MobileMenuProps> = (props) => {
	const { user, isLoading: userLoading } = useUser();
	const { handleClose, menuLinks } = props;

	const LinkText = (label: string) => {
		return <Text className="text-primaryBlack">{label}</Text>;
	};

	const menuItems =
		menuLinks &&
		menuLinks.map((item, index) => {
			const uniqueKey = `${(index + 48) * 146}_menu_item`;
			if (item.categories.length > 0) {
				const { categories, menuLabel, menuLink } = item;
				return (
					<div key={uniqueKey} className="flex flex-col gap-4">
						<div className="flex flex-row justify-between">
							<Text className="">{menuLabel}</Text>
							<Link passHref href={menuLink}>
								<Text className="underline text-primaryBlack">All</Text>
							</Link>
						</div>
						<div className="flex flex-col gap-4">
							{categories.map((category, index) => {
								const uniqueKeyCategories = `${(index + 11) * 99}`;
								return (
									<div key={uniqueKeyCategories} className="flex flex-col w-full gap-4 p-4 bg-primary/70 rounded-xl">
										<div className="flex flex-row justify-between">
											<Text className="">{category.category}</Text>
											<Link passHref href={getCategoryLink(category)}>
												<Text className="underline text-primaryBlack">All</Text>
											</Link>
										</div>
										<div className="flex flex-col gap-4">
											{category.product_sub_category.map((subcategory, index) => {
												const uniqueKeySubCategories = `${(index + 11) * 99}`;
												const subCategoryPageLink = getSubCategoryLink(category, subcategory);
												return (
													<Link key={uniqueKeySubCategories} href={subCategoryPageLink} className="p-2">
														<div className="underline">{subcategory.name}</div>
													</Link>
												);
											})}
										</div>
									</div>
								);
							})}
						</div>
					</div>
				);
			}
		});

	return (
		<section className="flex flex-col gap-10 p-6">
			<div className="flex justify-between w-full ">
				<div className={`flex justify-end w-6/12 p-2 ${!user ? "bg-transparent" : "bg-primary"} rounded-xl`}>
					{user && !userLoading ? (
						<UserAvatar handleToggle={() => null} user={user} theme="white" />
					) : (
						<Link href="/login">{LinkText("login")}</Link>
					)}
				</div>
				<ActionIcon onClick={handleClose}>
					<IconX size="6rem" className="text-primaryBlack" />
				</ActionIcon>
			</div>
			{/* <div>{menuItems}</div> */}
			<div className="flex flex-col gap-4 text-black">
				<Link href={"/user/wishlist"}>
					<a className="flex flex-row items-center gap-2 text-xl text-black underline">
						<p>Wishlist</p>
						<IconHeart size={30} className="stroke-black fill-primary" />
					</a>
				</Link>
				<Link href={"/user/orders"}>
					<a className="flex flex-row items-center gap-2 text-xl text-black underline">
						<p>Orders</p>
						<IconTruckDelivery size={30} className="stroke-black fill-primary" />
					</a>
				</Link>
				<Link href={"/contact-us"}>
					<a className="flex flex-row items-center gap-2 text-xl text-black underline">
						<p>Contact Us</p>
						<IconPhone size={30} className="stroke-black fill-primary" />
					</a>
				</Link>
				{user && !userLoading && (
					// <LinkIcon icon={<IconLogout size={30} className="stroke-white" />} link="/api/auth/logout" label="logout" />
					<Link href={"/api/auth/logout"}>
						<a className="flex flex-row items-center gap-2 text-xl text-black underline">
							<p>Logout</p>
							<IconLogout size={30} className="stroke-black fill-primary " />
						</a>
					</Link>
				)}
				{/* <LinkIcon icon={<IconTruckDelivery size={20} className="stroke-white" />} link="/user/orders" label="Orders" /> */}
			</div>
		</section>
	);
};
