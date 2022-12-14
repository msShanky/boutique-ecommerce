import { ActionIcon, Image, Text } from "@mantine/core";
import { IconEdit } from "@tabler/icons";
import { getSellingPrice } from "helpers/price-calculator";
import { getImageUrl } from "helpers/supabase-helper";
import React, { FunctionComponent } from "react";

type ProductRowProps = {
  product: ProductWithRelations;
  handleProductEdit: (product: ProductWithRelations) => void;
};

const ProductRow: FunctionComponent<ProductRowProps> = (props) => {
  const { product, handleProductEdit } = props;
  const { id, code, images, msrp, title, sub_title, product_discount } =
    product;
  const imageUrl = getImageUrl(images?.[0]);

  return (
    <tr key={product.id}>
      <td>{id}</td>
      <td className="flex items-center">
        <Image
          src={imageUrl}
          alt={`Product Image ${id}`}
          width={60}
          height={70}
          radius="md"
          fit="contain"
        />
        <Text className="ml-2 text-sm font-bold">{title}</Text>
      </td>
      <td>{code}</td>
      <td>{sub_title}</td>
      <td>{msrp}</td>
      <td>{getSellingPrice(product)}</td>
      <td>{product_discount}</td>
      <td className="hover:cursor-pointer">
        <ActionIcon
          onClick={() => handleProductEdit(product)}
          className="bg-violet"
          variant="filled"
        >
          <IconEdit size={16} />
        </ActionIcon>
      </td>
    </tr>
  );
};

export default ProductRow;
