import { ActionIcon, Image, Text } from "@mantine/core";
import { IconEdit } from "@tabler/icons";
import React, { FunctionComponent } from "react";

type ProductRowProps = {
	product: ProductWithRelations;
	handleProductEdit: (product: ProductWithRelations) => void;
};

const ProductRow: FunctionComponent<ProductRowProps> = (props) => {
	const { product, handleProductEdit } = props;
	const { id, code, images, msrp, title, sub_title, product_discount, category_id } = product;

	const getImageUrl = (value: any): string => {
		if (!value) return "";
		if (value[0].includes("https")) return value[0];
		return `${process.env.NEXT_PUBLIC_CDN}/${value[0]}`;
	};

	const imageUrl = getImageUrl(images);
	
	return (
		<tr key={product.id}>
			<td>{id}</td>
			<td className="flex items-center">
				<Image src={imageUrl} alt={`Product Image ${id}`} width={60} height={70} radius="md" fit="contain" />
				<Text className="ml-2 text-sm font-bold">{title}</Text>
			</td>
			<td>{code}</td>
			<td>{sub_title}</td>
			<td>{msrp}</td>
			<td>{product_discount}</td>
			<td className="hover:cursor-pointer">
				<ActionIcon onClick={() => handleProductEdit(product)} className="bg-violet" variant="filled">
					<IconEdit size={16} />
				</ActionIcon>
			</td>
		</tr>
	);
};

export default ProductRow;
