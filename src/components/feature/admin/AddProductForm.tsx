import React from "react";
import { Button, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useGetProductCategoriesQuery } from "../../../reducer/breezeBaseApi";

const AddProductForm = () => {
    const { data: categories } = useGetProductCategoriesQuery();
    
    const addProductForm = useForm({
        initialValues: {
            code: "",
            msrp: 0,
            title: "",
            sub_title: "",
            prodduct_discount: 0,
            category_id: ""
        },
    });
    
    return (
        <form onSubmit={addProductForm.onSubmit((values) => console.log(values))}>
            <TextInput label="Product Code" placeholder="123456" required {...addProductForm.getInputProps("code")} />
            <Select
                className="w-3/12 inline-block"
                label="Category"
                required
                {...addProductForm.getInputProps("category_id")}
                data={categories ? categories.body.map(({ category }) => ({ value: category || '', label: category })) : []}
            />
            <TextInput placeholder="350" label="MSRP" type="number" required {...addProductForm.getInputProps("msrp")} />
            <TextInput placeholder="Kalini" label="Product Title" required {...addProductForm.getInputProps("title")} />
            <TextInput placeholder="Women Teal Yoke Design Kurta with Palazzos &amp; With Dupatta" label="Product Subtitle" required {...addProductForm.getInputProps("sub_title")} />
            <TextInput placeholder="10" label="Product Discount" type="number" required {...addProductForm.getInputProps("prodduct_discount")} />
            <Button variant="outline" type="submit">Add Product</Button>
        </form>
    );
};

export default AddProductForm;
