import { ActionIcon, Image, Table, Text } from "@mantine/core";
import { IconEdit } from "@tabler/icons";
import React, { FunctionComponent } from "react";
import { useGetProductCategoriesQuery, useGetProductsByCategoryNameQuery } from "../../../reducer/breezeBaseApi";

type ProductTableProps = {
	category: string;
	handleProductEdit: (product: ProductWithRelations) => void;
};

const ProductTable: FunctionComponent<ProductTableProps> = (props) => {
	const { category, handleProductEdit } = props;
	const { data: categories } = useGetProductCategoriesQuery();
	const { data: products } = useGetProductsByCategoryNameQuery(category);

	const rows = products?.body.map((product, index) => {
		const { id, code, images, msrp, title, sub_title, product_discount, category_id } = product;
		return (
			<tr key={product.id}>
				<td>{index + 1}</td>
				<td>{id}</td>
				<td className="flex flex-row space-x-2">
					<Image
						src={images?.length ? `${images[0]}` : ""}
						alt={`Product Image ${id}`}
						width={83}
						height={87}
						fit="contain"
					/>
				</td>
				<td>{code}</td>
				<td>{categories?.body.filter(({ id }) => id === category_id)[0].category}</td>
				<td>{msrp}</td>
				<td>{title}</td>
				<td>{sub_title}</td>
				<td>{product_discount}</td>
				<td className="hover:cursor-pointer">
					<ActionIcon onClick={() => handleProductEdit(product)} className="bg-violet" variant="filled">
						<IconEdit size={16} />
					</ActionIcon>
				</td>
			</tr>
		);
	});

	return (
		<Table className="my-20 w-12/12">
			<thead>
				<tr>
					<th className="text-xl font-bold text-highlight-dark-blue">#</th>
					<th className="text-xl font-bold text-highlight-dark-blue">Id</th>
					<th className="text-xl font-bold text-highlight-dark-blue">Product Image</th>
					<th className="text-xl font-bold text-highlight-dark-blue">Product Code</th>
					<th className="text-xl font-bold text-highlight-dark-blue">Product Category</th>
					<th className="text-xl font-bold text-highlight-dark-blue">MSRP</th>
					<th className="text-xl font-bold text-highlight-dark-blue">Product Title</th>
					<th className="text-xl font-bold text-highlight-dark-blue">Product Subtitle</th>
					<th className="text-xl font-bold text-highlight-dark-blue">Product Discount</th>
					<th className="text-xl font-bold text-highlight-dark-blue">Actions</th>
				</tr>
			</thead>
			<tbody>{rows}</tbody>
		</Table>
	);
};

export default ProductTable;
