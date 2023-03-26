import React, { FunctionComponent } from "react";
import { ActionIcon, Image, Switch } from "@mantine/core";
import { getImageUrl } from "helpers/supabase-helper";
import { IconEdit } from "@tabler/icons";

type CategoryRowProps = {
	toggleEdit: (category: ProductCategory) => void;
	columns: TableColumns;
	data: ProductCategory;
};

const CategoryRow: FunctionComponent<CategoryRowProps> = (props) => {
	const { data, toggleEdit, columns } = props;
	const { category, id, category_image } = data;
	const imageUrl = getImageUrl(category_image);

	return (
		<tr key={id}>
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
							<td className="hover:cursor-pointer">
								<ActionIcon onClick={() => toggleEdit(data)} className="bg-primary" variant="filled">
									<IconEdit size={16} />
								</ActionIcon>
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
