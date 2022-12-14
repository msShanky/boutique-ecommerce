import { Button, Select, SelectItem } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { getCategoryData } from "helpers/supabase-helper";
import React, { FunctionComponent } from "react";
import { definitions } from "types/supabase";

type ProductFloatingBarProps = {
  selectedCategory: string;
  handleCategoryChange: (value: string | null) => void;
  toggleProductAdd: () => void;
  categories?: Array<definitions["product_category"]>;
};

const ProductFloatingBar: FunctionComponent<ProductFloatingBarProps> = (
  props
) => {
  const {
    selectedCategory,
    handleCategoryChange,
    toggleProductAdd,
    categories,
  } = props;

  return (
    <>
      <Select
        className="inline-block w-60"
        value={selectedCategory}
        placeholder="Select Category"
        onChange={handleCategoryChange}
        data={getCategoryData(categories)}
      />
      <Button
        variant="filled"
        className="bg-violet hover:bg-pink"
        leftIcon={<IconPlus size={14} />}
        onClick={toggleProductAdd}
      >
        Add Product
      </Button>
    </>
  );
};

export default ProductFloatingBar;
