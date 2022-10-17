import { Card, Image, Title } from "@mantine/core";
import { getImageUrl } from "helpers/supabase-helper";
import React, { FunctionComponent } from "react";
import { definitions } from "../../../types/supabase";

type ProductCategoryCardProps = {
  categoryProp: definitions["product_category"];
  handleCardClick: () => void;
};

const ProductCategoryCard: FunctionComponent<ProductCategoryCardProps> = (
  props
) => {
  const { categoryProp, handleCardClick } = props;
  const { category, category_image } = categoryProp;

	return (
		<Card
			onClick={handleCardClick}
			className="space-y-8 bg-white shadow-md w-72 h-80 hover:bg-violet group hover:cursor-pointer"
		>
			<Card.Section className="h-4/5">
				<Image
					classNames={{
						image: "object-top",
					}}
					height={250}
					fit="cover"
					src={getImageUrl(category_image)}
					alt="product-category"
				/>
			</Card.Section>
			<div className="mt-4">
				<Title className="font-sans text-2xl group-hover:text-white text-highlight-dark-blue" order={2}>
					{category}
				</Title>
			</div>
		</Card>
	);
};

export default ProductCategoryCard;
