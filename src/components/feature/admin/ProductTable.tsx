import { ProductRow } from "@/components/common/admin";
import { Table } from "@mantine/core";
import React, { FunctionComponent } from "react";
import { useGetProductsByCategoryNameQuery } from "../../../reducer/breezeBaseApi";

type ProductTableProps = {
	category: string;
	handleProductEdit: (product: ProductWithRelations) => void;
};

const columns = [
	{ value: "id", label: "Id" },
	{ value: "title", label: "Product" },
	{ value: "code", label: "Product Code" },
	{ value: "subtitle", label: "Product Subtitle" },
	{ value: "msrp", label: "MSRP" },
	{ value: "discount", label: "Product Discount" },
	{ value: "actions", label: "Actions" },
];

const ProductTable: FunctionComponent<ProductTableProps> = (props) => {
	const { category, handleProductEdit } = props;
	const { data: products } = useGetProductsByCategoryNameQuery(category);

	const rows = products?.body.map((product) => {
		const key = `PRODUCT_ROW_${product.code}`;
		return <ProductRow key={key} product={product} handleProductEdit={handleProductEdit} />;
	});

	return (
		<Table className="mt-8 mb-20 w-12/12">
			<thead>
				<tr>
					{columns.map((column) => {
						const key = `${column.value}_Column_Item`;
						return (
							<th key={key} className="text-xs font-bold text-highlight-dark-blue">
								{column.label}
							</th>
						);
					})}
				</tr>
			</thead>
			<tbody>{rows}</tbody>
		</Table>
	);
};

export default ProductTable;
