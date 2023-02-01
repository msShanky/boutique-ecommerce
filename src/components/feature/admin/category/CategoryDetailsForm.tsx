import React, { FunctionComponent } from "react";
import { UseFormReturnType } from "@mantine/form";
import { TextInput } from "@mantine/core";

type CategoryDetailsFormProps = {
  categoryForm: UseFormReturnType<CategoryPostBody>;
};

const CategoryDetailsForm: FunctionComponent<CategoryDetailsFormProps> = (
  props
) => {
  const { categoryForm } = props;
  const { getInputProps } = categoryForm;
  return (
    <div>
      <TextInput
        label="Product Category"
        className="w-full"
        placeholder="Category"
        required
        {...getInputProps("category")}
      />
      <TextInput
        placeholder="Description"
        className="w-full"
        label="Category Description"
        {...getInputProps("description")}
      />
    </div>
  );
};
export default CategoryDetailsForm;
