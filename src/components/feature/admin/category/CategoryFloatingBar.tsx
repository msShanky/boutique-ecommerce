import React, { FunctionComponent } from "react";
import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons";

type CategoryFloatingBarProps = {
  toggleAdd: () => void;
};

const CategoryFloatingBar: FunctionComponent<CategoryFloatingBarProps> = (
  props
) => {
  const { toggleAdd } = props;
  return (
    <Button
      variant="filled"
      className="bg-violet hover:bg-pink"
      leftIcon={<IconPlus size={14} />}
      onClick={toggleAdd}
    >
      Add Category
    </Button>
  );
};
export default CategoryFloatingBar;
