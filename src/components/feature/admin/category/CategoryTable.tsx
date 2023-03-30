import React, { FunctionComponent } from "react";
import { Table } from "@mantine/core";
import CategoryRow from "./CategoryRow";

type CategoryTableProps = {
	toggleEdit: (category: ProductCategory) => void;
	categories: Array<ProductCategory>;
};

const columns: TableColumns = [
	{ value: "id", label: "Id" },
	{ value: "category", label: "Product Category" },
	{ value: "category_image", label: "Category Image", componentType: "image" },
	{ value: "page_link", label: "Page Link" },
	{ value: "is_published", label: "Published", componentType: "toggle" },
	{ value: "actions", label: "Actions", componentType: "action_tray" },
];

const CategoryTable: FunctionComponent<CategoryTableProps> = (props) => {
	const { toggleEdit, categories } = props;

	const rows = categories?.map((category) => {
		const key = `CATEGORY_ROW_${category.category}`;
		return <CategoryRow columns={columns} key={key} data={category} toggleEdit={toggleEdit} />;
	});

	return (
		<Table className="mt-8 mb-20 w-12/12">
			<thead>
				<tr>
					{columns.map((column) => {
						const key = `${column.value}_Column_Item`;
						return (
							<th key={key} className="text-xs font-bold text-primary">
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
export default CategoryTable;
