import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Button, Drawer, Select } from "@mantine/core";
import { Plus } from "tabler-icons-react";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { ProductForm, ProductTable } from "@/components/feature";
import { AppLayout } from "@/components/layout";
import { useGetProductCategoriesQuery } from "@/reducer/breezeBaseApi";
import { definitions } from "types/supabase";

const Admin = () => {
	const [selectedCategory, setSelectedCategory] = useState<definitions["product_category"] | null>();
	const [isAddProduct, setIsProductAdd] = useState(false);
	const [shouldOpenDrawer, setShouldOpenDrawer] = useState(false);
	const [activeProduct, setActiveProduct] = useState<ProductWithRelations>();
	const { data: categories } = useGetProductCategoriesQuery();

	const handleCategoryUpdate = (value: definitions["product_category"] | null) => {
		setSelectedCategory(value);
	};

	const handleCategoryChange = (value: string) => {
		const _selectedCategory = categories?.body.filter((category) => category.id === parseInt(value, 10))[0];
		if (!_selectedCategory) return null;
		handleCategoryUpdate(_selectedCategory);
	};

	useEffect(() => {
		handleCategoryUpdate(categories?.body[0] || null);
	}, [categories]);

	const toggleProductAdd = () => {
		setShouldOpenDrawer(true);
		setIsProductAdd(true);
	};

	const getCategoryData = () => {
		if (!categories) return [];
		return categories.body.map(({ category, id }) => ({ value: id.toString() || "", label: category }));
	};

	const handleProductEdit = (product: ProductWithRelations) => {
		setShouldOpenDrawer(true);
		setIsProductAdd(false);
		setActiveProduct(product);
	};

	const handleDrawerClose = () => {
		// TODO: Add a warning when trying to close the drawer
		setShouldOpenDrawer(false);
	};

	return (
		<AppLayout>
			<>
				<Head>
					<title>Breeze Boutique | Admin</title>
				</Head>
				<main className="container mx-auto mt-12">
					<div className="flex items-end space-x-8">
						<Select
							className="inline-block w-3/12"
							label="Category"
							value={selectedCategory?.id.toString()}
							onChange={handleCategoryChange}
							data={getCategoryData()}
						/>
						<Button
							variant="filled"
							className="bg-violet hover:bg-pink"
							leftIcon={<Plus size={14} />}
							onClick={toggleProductAdd}
						>
							Add Product
						</Button>
					</div>
					<Drawer
						closeOnClickOutside={false}
						closeOnEscape={false}
						opened={shouldOpenDrawer}
						position="right"
						onClose={handleDrawerClose}
						title={`Product ${isAddProduct ? "Add" : "Edit"}`}
						padding="xl"
						size="xl"
					>
						{/* Drawer content */}
						<ProductForm isAdd={isAddProduct} product={activeProduct} categories={categories?.body} />
					</Drawer>
					{selectedCategory && (
						<ProductTable category={selectedCategory.category as string} handleProductEdit={handleProductEdit} />
					)}
				</main>
			</>
		</AppLayout>
	);
};

export default Admin;

export const getServerSideProps = withPageAuth({ redirectTo: "/" });
