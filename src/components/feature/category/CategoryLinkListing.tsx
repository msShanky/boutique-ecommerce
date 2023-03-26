import React, { FC } from "react";
import Link from "next/link";
import { Image, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { getCategoryLink, getCategoryThumbnail, getImageUrl } from "@/helpers/supabase-helper";

type CategoryListingProps = {
	items: Array<CategoryMenuWithRelations>;
};

export const CategoryLinkListing: FC<CategoryListingProps> = ({ items }) => {
	const { width } = useViewportSize();

	return (
		<div className="flex flex-row gap-8">
			{items &&
				items.map((category, index: number) => {
					const uniqueKey = `${index + 45 * 788}_category `;
					const imageSrc = getImageUrl(category.category_image);
					const categoryLink = getCategoryLink(category);
					if (!category.is_published || !categoryLink) return null;

					return (
						<Link key={uniqueKey} passHref legacyBehavior href={categoryLink}>
							<div className="flex flex-col items-center gap-y-4 hover:cursor-pointer hover:border-solid hover:border-">
								{imageSrc ? (
									<Image
										height={width < 600 ? 75 : 150}
										width={width < 600 ? 75 : 150}
										src={imageSrc}
										alt={category.category}
										className="overflow-hidden rounded-full"
										classNames={{
											imageWrapper: "",
											image: "object-top",
											root: "hover:border-primary hover:border-2",
										}}
									/>
								) : (
									<div className="w-[150px] h-[150px] bg-primary rounded-full flex justify-center items-center text-5xl font-light">
										{getCategoryThumbnail(category?.category as string)}
									</div>
								)}
								<Text className="font-sans text-sm lg:text-xl">{category.category}</Text>
							</div>
						</Link>
					);
				})}
		</div>
	);
};
