import React, { FunctionComponent } from "react";
import { ActionIcon, Image, Table } from "@mantine/core";
import { getImageUrl } from "helpers/supabase-helper";
import { IconEdit } from "@tabler/icons";

type CategoryRowProps = {
  toggleEdit: (category: ProductCategory) => void;
  data: ProductCategory;
};

const CategoryRow: FunctionComponent<CategoryRowProps> = (props) => {
  const { data, toggleEdit } = props;
  const { category, id, description, category_image } = data;
  const imageUrl = getImageUrl(category_image);

  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{category}</td>
      {/* <td>{description}</td> */}
      <td>
        <Image
          src={imageUrl}
          alt={`Category Image ${id}`}
          width={60}
          height={70}
          radius="md"
          fit="contain"
        />
      </td>
      <td className="hover:cursor-pointer">
        <ActionIcon
          onClick={() => toggleEdit(data)}
          className="bg-primary"
          variant="filled"
        >
          <IconEdit size={16} />
        </ActionIcon>
      </td>
    </tr>
  );
};

export default CategoryRow;
