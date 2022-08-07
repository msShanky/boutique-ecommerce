import React, { useEffect, useState } from "react";
import { Button, Modal, Select } from "@mantine/core";
import { useRouter } from "next/router";
import Head from "next/head";
import AppLayout from "../components/layout/AppLayout";
import { useGetProductCategoriesQuery } from "../reducer/breezeBaseApi";
import ProductTable from "../components/feature/admin/ProductTable";
import { Plus } from "tabler-icons-react";
import AddProductForm from "../components/feature/admin/AddProductForm";

const Admin = () => {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState<string | null>('');
    const [isAddProductFormOpen, setIsAddProductFormOpen] = useState(false);

    const { category, edit } = router.query;
    const { data: categories } = useGetProductCategoriesQuery();

    useEffect(() => {
        if (category && categories?.body.filter(c => `${c.category}` === category)) handleCategoryUpdate(category.toString())
        else handleCategoryUpdate(categories?.body[0].category || '')
    }, [categories])

    const handleCategoryUpdate = (value: string | null) => {
        setSelectedCategory(value);
        if (value) router.query.category = value
        else delete router.query.category
        router.push(router)
    }

    return (
        <AppLayout>
            <>
                <Head>
                    <title>Breeze Boutique | Admin</title>
                </Head>
                <main className="container mx-auto mt-12">
                    <Select
                        className="w-3/12 inline-block"
                        label="Category"
                        value={selectedCategory}
                        onChange={handleCategoryUpdate}
                        data={categories ? categories.body.map(({ category, id }) => ({ value: category || '', label: category })) : []}
                    />
                    <Button variant="light" leftIcon={<Plus size={14} />} onClick={() => setIsAddProductFormOpen(true)}>
                        Add Product
                    </Button>
                    <Modal
                        opened={isAddProductFormOpen}
                        onClose={() => setIsAddProductFormOpen(false)}
                        title="Add Product"
                    >
                        <AddProductForm />
                    </Modal>
                    {selectedCategory && <ProductTable category={selectedCategory} />}
                </main>
            </>
        </AppLayout>
    );
};

export default Admin;
