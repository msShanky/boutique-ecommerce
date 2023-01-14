import { Title, Image } from "@mantine/core";
import React, { FunctionComponent } from "react";

type CategorySectionProps = {
	items: Array<ProductCategory>;
};

export const CategorySection: FunctionComponent<CategorySectionProps> = (props) => {
	const { items } = props;
	return (
		<div className="container flex flex-col items-center justify-center gap-6 mx-auto mt-10">
			<Title className="font-sans text-4xl text-primaryBlack">Shop By Categories</Title>
			{items &&
				items.map((category, index) => {
					const uniqueKey = `${index + 45 * 788}_category `;
					return (
						<div key={uniqueKey} className="">
							<Image height={120} width={120} src={category.category_image} alt={category.category} />
							{category.category}
						</div>
					);
				})}
		</div>
	);
};
