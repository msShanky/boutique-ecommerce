import React, { FunctionComponent } from "react";
import { ActionIcon, Image, Switch } from "@mantine/core";
import { getImageUrl } from "helpers/supabase-helper";
import { IconEdit, IconTrash } from "@tabler/icons";

type CategoryRowProps = {
	toggleEdit: (category: ProductCategory) => void;
	toggleDelete: (category: ProductCategory) => void;
	columns: TableColumns;
	data: ProductCategory;
};

const CategoryRow: FunctionComponent<CategoryRowProps> = (props) => {
	const { data, toggleEdit, toggleDelete, columns } = props;
	const { category, id, category_image } = data;
	const imageUrl = getImageUrl(category_image);

	return (
		<tr key={`${id}_product_category_${Math.random() * 48}`} className="min-h-fit">
			{columns.map((columnInfo, index) => {
				const { value, componentType } = columnInfo;
				switch (componentType) {
					case "image":
						return (
							<td>
								<Image src={imageUrl} alt={`Category Image ${id}`} width={60} height={70} radius="md" fit="contain" />
							</td>
						);

					case "toggle":
						return (
							<td>
								{/* @ts-ignore */}
								<Switch checked={data[value]} />
							</td>
						);

					case "action_tray":
						return (
							<td>
								<div className="inline-flex flex-row gap-2">
									<ActionIcon onClick={() => toggleEdit(data)} className="bg-primary" variant="filled">
										<IconEdit size={16} />
									</ActionIcon>
									<ActionIcon onClick={() => toggleDelete(data)} className="bg-error hover:bg-red-300" variant="filled">
										<IconTrash size={16} />
									</ActionIcon>
								</div>
							</td>
						);

					default:
						// @ts-ignore
						return <td key={`${(index + 6) * 789456}`}>{data[value]}</td>;
				}
			})}
		</tr>
	);
};

export default CategoryRow;
