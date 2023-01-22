import { Title, Image, Text } from "@mantine/core";
import React, { FunctionComponent } from "react";
import { getImageUrl } from "@/helpers/supabase-helper";

type CategorySectionProps = {
	items: Array<ProductCategory>;
};

export const CategorySection: FunctionComponent<CategorySectionProps> = (props) => {
	const { items } = props;
	return (
		<div className="container flex flex-col items-center justify-center gap-6 mx-auto mt-10">
			<Title className="mb-12 font-sans text-3xl md:text-5xl text-primaryBlack font-extralight">Shop By Categories</Title>
			<div className="flex flex-col gap-8 md:flex-row">
				{items &&
					items.map((category, index) => {
						const uniqueKey = `${index + 45 * 788}_category `;
						return (
							<div
								onClick={() => console.log("Navigate the user to the category page")}
								key={uniqueKey}
								className="flex flex-col items-center gap-y-4 hover:cursor-pointer"
							>
								<Image
									height={300}
									width={300}
									src={getImageUrl(category.category_image)}
									alt={category.category}
									className="overflow-hidden rounded-full"
									classNames={{
										image: "object-top",
									}}
								/>
								<Text className="font-sans text-2xl">{category.category}</Text>
							</div>
						);
					})}
			</div>
		</div>
	);
};
