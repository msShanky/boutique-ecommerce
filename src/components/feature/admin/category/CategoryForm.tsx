import React, { FunctionComponent, useEffect, useState } from "react";
import {
  Button,
  NumberInput,
  SegmentedControl,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { definitions } from "types/supabase";
import { IconX } from "@tabler/icons";
import { ImageUploader, ImageViewer } from "@/components/feature/admin";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { formatCategoryFormForUpdate } from "helpers/supabase-helper";
import CategoryFormDetails from "./CategoryDetailsForm";

type CategoryFormProps = {
  isAdd: boolean;
  category?: ProductCategory;
  handleCancel: () => void;
  handleSubmit: (values: CategoryPostBody) => void;
};

const initialFormState: CategoryPostBody = {
  category: "",
  description: "",
  category_image: "",
};

const getFormInitialState = (category: ProductCategory | undefined) => {
  if (!category) return initialFormState;
  return { ...category };
};

const CategoryForm: FunctionComponent<CategoryFormProps> = (props) => {
  const { isAdd, category, handleCancel, handleSubmit } = props;
  // TODO: Add Form validation for all fields that has to be validated
  const categoryForm = useForm({
    initialValues: getFormInitialState(category),
  });
  const { setFieldValue, onSubmit, values } = categoryForm;

  const handleImageSuccess = (value: string) => {
    // setProductImages([...productImages, value]);
    setFieldValue("category_image", value);
  };
  const handleImageDelete = async (index: number) => {
    const imageUrl = values.category_image as string;
    await supabaseClient.storage
      .from("category-image")
      .remove([imageUrl.split("image/")[1]]);
    const { ...coreCategory } = formatCategoryFormForUpdate(values);
    await supabaseClient
      .from("product_category")
      .update({ ...coreCategory, category_image: "" });
    setFieldValue("category_image", "");
  };
  return (
    <form
      className="grid grid-cols-2 gap-5"
      onSubmit={onSubmit((values) => handleSubmit(values))}
    >
      <section className="flex flex-col">
        <ImageUploader
          type="category-image"
          isDisabled={!values.category}
          handleImageSuccess={handleImageSuccess}
          code={values.category as string}
        />
        {values.category_image && (
          <ImageViewer
            productImages={[values.category_image as string]}
            handleImageDelete={handleImageDelete}
          />
        )}
      </section>

      <CategoryFormDetails categoryForm={categoryForm} />
      <div className="flex justify-end col-start-2 mt-12 space-x-4">
        <Button
          leftIcon={<IconX />}
          onClick={handleCancel}
          variant="filled"
          className="bg-error"
          type="reset"
        >
          Cancel
        </Button>
        <Button variant="outline" type="submit">
          {isAdd ? "Add" : "Edit"} Category
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;
