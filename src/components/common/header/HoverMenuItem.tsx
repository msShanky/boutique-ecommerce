import React, { FC } from "react";
import { createStyles, HoverCard, Group, Text, SimpleGrid, Anchor, Divider, Center, Box } from "@mantine/core";
import { IconChevronDown, IconChevronRight } from "@tabler/icons";

type HoverMenuItemProps = {
	categoryItem: MenuLinkPropTypes;
};

export const HoverMenuItem: FC<HoverMenuItemProps> = (props) => {
	const { categoryItem } = props;

	const { categories, menuLabel, menuLink } = categoryItem;

	const links = categories.map((categoryInfo) => {
		const { category, id, product_sub_category } = categoryInfo;
		const categoryLink = `${menuLink}/${category?.split(" ").join("-").toLowerCase()}`;

		return (
			<div className="flex flex-col gap-4" key={`${category}_${id}`}>
				<a href={categoryLink} className="flex items-center justify-between w-full">
					<Text size="sm" className="font-bold">
						{category}
					</Text>
					<IconChevronRight size={16} className="text-primaryAlt" />
				</a>
				<div className="flex flex-col gap-2">
					{product_sub_category.map((subCategory) => {
						const { name, node_categories } = subCategory;
						const link = `${categoryLink}/${name?.split(" ").join("-")?.toLowerCase()}`;
						if (node_categories.length <= 0) {
							return (
								<a key={`${name}_${category}`} className="text-sm" href={link}>
									{name}
								</a>
							);
						} else {
							return (
								<div key={`${name}_${category}`} className="flex flex-col gap-4">
									<a href={categoryLink} className="flex items-center justify-between w-full">
										<Text size="xs" className="font-semibold">
											{name}
										</Text>
										<IconChevronRight size={16} className="text-primaryAlt" />
									</a>
									<div className="flex flex-col gap-2">
										{node_categories.map((nodeCategory) => {
											const { name: nodeCategoryName } = nodeCategory;
											return (
												<a key={`${name}_${category}`} className="text-xs" href={link}>
													{nodeCategoryName}
												</a>
											);
										})}
									</div>
								</div>
							);
						}
					})}
				</div>
			</div>
		);
	});

	return (
		<HoverCard width={800} position="bottom" radius="md" shadow="md" withinPortal>
			<HoverCard.Target>
				<a
					href={menuLink}
					className="flex items-center px-6 text-sm font-medium text-white no-underline md:h-full h-11 hover:text-primary"
				>
					<Center inline>
						<Box component="span" mr={5}>
							{menuLabel}
						</Box>
						{categories.length > 0 && <IconChevronDown size={16} className="text-primary" />}
					</Center>
				</a>
			</HoverCard.Target>
			{categories.length > 0 && (
				<HoverCard.Dropdown sx={{ overflow: "hidden" }}>
					<Group position="apart" px="md">
						<Text weight={500}>{menuLabel}</Text>
						<Anchor href={menuLink} size="xs">
							View all
						</Anchor>
					</Group>
					<Divider my="sm" mx="-md" className="text-primaryBlack" />
					<div className="grid grid-cols-4 gap-4 p-4 gap-y-8">{links}</div>
				</HoverCard.Dropdown>
			)}
		</HoverCard>
	);
};
