import React, { FC } from "react";
import { Title, Image, Text } from "@mantine/core";
import Link from "next/link";
import { getCategoryThumbnail, getImageUrl } from "@/helpers/supabase-helper";

type SubCategoryListingProps = {
	items: Array<SubCategoryWithRelations>;
	genderLink: string;
	categoryLink: string;
};

export const SubCategoryListing: FC<SubCategoryListingProps> = ({ items, genderLink, categoryLink }) => {
	return (
		<div className="flex flex-col gap-8 md:flex-row">
			{items &&
				items.map((subCategory, index: number) => {
					const uniqueKey = `${index + 45 * 788}_category `;
					const subCategoryLink = `/shop/${genderLink}/${categoryLink}/${subCategory.page_link}`;
					return (
						<Link key={uniqueKey} passHref href={subCategoryLink}>
							<div className="flex flex-col items-center gap-y-4 hover:cursor-pointer">
								<div className="w-[150px] h-[150px] bg-primary rounded-full flex justify-center items-center text-5xl font-light">
									<Text className="font-sans text-xl">{subCategory.name}</Text>
								</div>
							</div>
						</Link>
					);
				})}
		</div>
	);
};
