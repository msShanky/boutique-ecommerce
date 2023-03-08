import React, { FC } from "react";
import { Title, Image, Text } from "@mantine/core";
import Link from "next/link";
import { getCategoryThumbnail, getImageUrl } from "@/helpers/supabase-helper";

type CategoryListingProps = {
	items: Array<CategoryMenuWithRelations>;
};

export const CategoryListing: FC<CategoryListingProps> = ({ items }) => {
	return (
		<div className="flex flex-col gap-8 md:flex-row">
			{items &&
				items.map((category, index: number) => {
					const uniqueKey = `${index + 45 * 788}_category `;
					const imageSrc = getImageUrl(category.category_image);
					const categoryLink = `/shop/${category.gender_group.gender?.toLowerCase()}/${category.page_link}`;
					return (
						<Link key={uniqueKey} passHref href={categoryLink}>
							<div className="flex flex-col items-center gap-y-4 hover:cursor-pointer">
								{imageSrc ? (
									<Image
										height={150}
										width={150}
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
										{/* {`${category?.category?.split(" ")[0][0]} ${category?.category?.split(" ")[1][0]}`} */}
										{getCategoryThumbnail(category?.category as string)}
									</div>
								)}
								<Text className="font-sans text-xl">{category.category}</Text>
							</div>
						</Link>
					);
				})}
		</div>
	);
};
