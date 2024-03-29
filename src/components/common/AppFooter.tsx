import { Button, Text, TextInput, Title, Image } from "@mantine/core";
import { IconBrandFacebook, IconBrandWhatsapp, IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import React, { FC } from "react";

type AppFooterProps = {
	menuLinks?: Array<MenuLinkPropTypes>;
};

{
	/* TODO: [1] [Prod] Add page links for completing compliance  */
}
const AppFooter: FC<AppFooterProps> = (props) => {
	const { menuLinks } = props;

	return (
		<footer className="w-full bg-primary min-h-[532px] flex flex-col gap-y-10">
			{/* <section className="container flex flex-col gap-12 p-10 mx-auto md:pt-24 md:flex-row md:gap-20"> */}
			<section className="container flex flex-col gap-2 p-10 mx-auto mb-20 align-top lg:gap-12 md:pt-24 md:flex-row md:gap-20 md:p-4">
				<div className="flex flex-col w-2/12 md:w-4/12 gap-y-4">
					<Image
						src="/images/breeze_logo_v2.svg"
						width={80}
						alt="Breeze Boutique Logo"
						className="text-2xl text-primary"
					>
						Logo
					</Image>
					<Text className="text-base font-semibold">Contact Info</Text>
					<a href="mailto:care@breezeboutique.in" className="underline">
						care@breezeboutique.in
					</a>
					<Text className="text-base font-semibold lg:hidden">Social Links</Text>
					<div className="flex flex-row gap-1 lg:hidden">
						<Link passHref legacyBehavior href="https://wa.me/message/YDU5CC6W2247I1">
							<a target="_blank" rel="noreferrer" href="https://wa.me/message/YDU5CC6W2247I1">
								<div className="flex items-center justify-center w-10 h-10 rounded-full md:w-12 md:h-12 bg-secondary">
									<IconBrandWhatsapp className=" stroke-primaryBlack" size={30} />
								</div>
							</a>
						</Link>
						<Link
							passHref
							legacyBehavior
							href="https://www.facebook.com/profile.php?id=100083119281213&mibextid=ZbWKwL"
						>
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
				</div>
				<div className="flex flex-col w-fit">
					<Title className="text-2xl font-semibold text-primaryBlack">Categories</Title>
					<div className="flex flex-col mt-8 text-primary text-opacity-30 gap-y-4">
						<Link href="/shop/women/kurta">
							<p className="text-sm underline text-primaryBlack hover:cursor-pointer">Kurta</p>
						</Link>
					</div>
					{/* FIXME: [1] [Prod] Clicking on category Women on footer is not working  */}
					{/* <div className="flex flex-col mt-8 text-primary text-opacity-30 gap-y-4">
						{menuLinks &&
							menuLinks.map((menuItem, index) => {
								const { categories, menuLabel, menuLink } = menuItem;
								if (categories.length <= 0) return null;
								return (
									<div key={`category_${menuLabel}_${(index + 456) * 87954}}`} className="flex flex-col gap-8">
										<Text className="font-sans text-xl text-primaryAlt hover:cursor-pointer hover:underline">
											{menuLabel}
										</Text>
										<div className="flex flex-row gap-12">
											{categories.map((categoryItem, categoryIndex) => {
												const { category, id, product_sub_category } = categoryItem;
												const categoryUniqueKey = `sub_category_${id}_${(categoryIndex + 9) * 222}`;
												const categoryLink = `${menuLink}/${category?.split(" ").join("-").toLowerCase()}`;
												return (
													<div key={categoryUniqueKey} className="flex flex-col gap-6">
														<a href={categoryLink} className="flex items-center justify-between w-full ">
															<Text size="sm" className="font-bold text-primaryBlack hover:underline">
																{category}
															</Text>
															<IconChevronRight size={16} className="text-primaryAlt" />
														</a>
														TODO: [4] [Accessibility] Construct the links with Link href object for performance 
														<div className="flex flex-col gap-4">
															{product_sub_category.map((subCategory, subCategoryIndex) => {
																const { name, category_id, id } = subCategory;
																const link = `${categoryLink}?filter=${name?.split(" ").join("-")?.toLowerCase()}`;
																const subCategoryUIndex = `${name?.toLowerCase()}_category_${category_id}_${id}_${
																	(subCategoryIndex + 86) * 7896
																}`;
																return (
																	<a
																		key={subCategoryUIndex}
																		className="text-sm text-primaryBlack hover:underline"
																		href={link}
																	>
																		{name}
																	</a>
																);
															})}
														</div>
													</div>
												);
											})}
										</div>
									</div>
								);
							})}
					</div> */}
				</div>
				<article className="container flex flex-col w-full lg:w-2/12 gap-y-4">
					<Title className="text-2xl font-semibold text-primaryBlack">Quick Links</Title>
					<div className="flex flex-col gap-6">
						<Link href="/privacy" passHref>
							<a className="text-sm underline">Privacy policy</a>
						</Link>
						<Link href="/returns-exchange" passHref>
							<a className="text-sm underline">Returns &amp; exchanges</a>
						</Link>
						<Link href="/payment-method" passHref>
							<a className="text-sm underline">Payment method</a>
						</Link>
						<Link href="/terms-conditions" passHref>
							<a className="text-sm underline">Terms &amp; conditions</a>
						</Link>
						<Link href="/contact-us" passHref>
							<a className="text-sm underline">Contact Us</a>
						</Link>
						<Link href="/shipping-delivery" passHref>
							<a className="text-sm underline">Shipping &amp; Delivery Policy</a>
						</Link>
					</div>
				</article>
			</section>
		</footer>
	);
};

export default AppFooter;
