import React, { FunctionComponent } from "react";
import { Table } from "@mantine/core";
import CategoryRow from "./CategoryRow";

type CategoryTableProps = {
  toggleEdit: (category: ProductCategory) => void;
  categories: Array<ProductCategory>;
};

const columns = [
  { value: "id", label: "Id" },
  { value: "category", label: "Product Category" },
  // { value: "description", label: "Category Description" },
  { value: "category_image", label: "Category Image" },
  { value: "actions", label: "Actions" },
];

const CategoryTable: FunctionComponent<CategoryTableProps> = (props) => {
  const { toggleEdit, categories } = props;
  const rows = categories?.map((category) => {
    const key = `CATEGORY_ROW_${category.category}`;
    return <CategoryRow key={key} data={category} toggleEdit={toggleEdit} />;
  });
  return (
    <Table className="mt-8 mb-20 w-12/12">
      <thead>
        <tr>
          {columns.map((column) => {
            const key = `${column.value}_Column_Item`;
            return (
              <th
                key={key}
                className="text-xs font-bold text-highlight-dark-blue"
              >
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
