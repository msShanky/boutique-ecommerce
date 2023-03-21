import { Button, Text, TextInput, Title, Image } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import React, { FC } from "react";

type AppFooterProps = {
	menuLinks?: Array<MenuLinkPropTypes>;
};

const AppFooter: FC<AppFooterProps> = (props) => {
	const { menuLinks } = props;

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
						{menuLinks &&
							menuLinks.map((menuItem, index) => {
								const { categories, menuLabel, menuLink } = menuItem;
								if (categories.length <= 0) return null;
								return (
									<>
										<Text className="font-sans text-xl text-primaryAlt hover:cursor-pointer hover:underline">
											{menuLabel}
										</Text>
										<div className="flex flex-row gap-12">
											{categories.map((categoryItem) => {
												const { category, id, product_sub_category } = categoryItem;
												const uniqueKey = `sub_category_${id}`;
												const categoryLink = `${menuLink}/${category?.split(" ").join("-").toLowerCase()}`;
												return (
													<div key={uniqueKey} className="flex flex-col gap-6">
														<a href={categoryLink} className="flex items-center justify-between w-full ">
															<Text size="sm" className="font-bold text-primaryBlack hover:underline">
																{category}
															</Text>
															<IconChevronRight size={16} className="text-primaryAlt" />
														</a>
														<div className="flex flex-col gap-4">
															{product_sub_category.map((subCategory) => {
																const { name, category_id, id } = subCategory;
																const link = `${categoryLink}?filter=${name?.split(" ").join("-")?.toLowerCase()}`;
																return (
																	<a
																		key={`${name?.toLowerCase()}_category_${category_id}_${id}`}
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
									</>
								);
							})}
					</div>
				</div>
			</section>
		</footer>
	);
};

export default AppFooter;
