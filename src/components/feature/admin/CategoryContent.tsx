import React, { useState, useEffect } from "react";
import { LoadingOverlay } from "@mantine/core";
import { useGetProductCategoriesQuery, useLazyGetProductCategoriesQuery } from "@/reducer/breezeBaseApi";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { formatCategoryFormForUpdate } from "helpers/supabase-helper";
import { PostgrestError } from "@supabase/supabase-js";
import { CategoryList, CategoryManager } from "@/components/feature/admin/category";
import { DeleteWarningModal } from "./warning";
import { useToggle } from "@mantine/hooks";
// TODO: Add parent category for gender and child categories for different types

const CategoryContent = () => {
	const [deleteModalOpened, setDeleteModalOpened] = useToggle();
	const [crudState, setCrudState] = useState<AdminCRUDContent>("read");
	const [activeCategory, setActiveCategory] = useState<ProductCategory>();
	const [categoryApiState, setCategoryApiState] = useState<ApiStatus>("idle");
	const { data: categories, isLoading } = useGetProductCategoriesQuery(undefined, {
		refetchOnFocus: true,
	});

	const toggleCategoryAdd = () => {
		setCrudState("create");
	};

	const toggleCategoryEdit = (category: ProductCategory) => {
		setActiveCategory(category);
		setCrudState("update");
	};

	const toggleCategoryDelete = (category: ProductCategory) => {
		setDeleteModalOpened(true);
		setActiveCategory(category);
	};

	// TODO: If there is an error when creating a new product delete the image created for the same product
	const handleCategoryApiResponse = (data: any | null, error: PostgrestError | null) => {
		if (error) {
			setCategoryApiState("error");
		} else if (data) {
			setCategoryApiState("success");
		}
	};

	const handleCategoryAdd = async (category: CategoryPostBody) => {
		const { ...coreCategory } = category;
		const { data, error } = await supabaseClient.from("product_category").insert(coreCategory);

		// getProductCategories();
	};

	const handleCategoryDelete = async () => {
		if (!activeCategory) {
			return;
		}

		const deletedData = await supabaseClient.from("product_category").delete().match({ id: activeCategory.id });
		// getProductCategories();
	};

	const handleCategoryEdit = async (category: ProductCategory) => {
		const { ...coreCategory } = formatCategoryFormForUpdate(category);
		const { data, error } = await supabaseClient.from("product_category").update(coreCategory).eq("id", category.id);
		handleCategoryApiResponse(data, error);
		// getProductCategories();
	};

	const handleCategoryUpdate = async (category: CategoryPostBody | ProductCategory) => {
		setCategoryApiState("in-progress");
		if (crudState === "create") {
			handleCategoryAdd(category as CategoryPostBody);
		} else if (crudState === "update") {
			handleCategoryEdit(category as ProductCategory);
		}
	};

	const handleCancel = () => {
		setCrudState("read");
		setCategoryApiState("idle");
		setActiveCategory(undefined);
	};

	useEffect(() => {
		// getProductCategories();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const shouldShowLoader = isLoading || categoryApiState === "in-progress";
	const shouldShowForm = (crudState === "create" || crudState === "update") && !shouldShowLoader;

	if (shouldShowLoader) {
		return (
			<div className="w-full min-h-[85vh] relative bg-primary">
				<LoadingOverlay visible={true} overlayBlur={2} />
			</div>
		);
	}

	// Display the list of products if the state is read
	if (crudState === "read" && !shouldShowLoader) {
		return (
			<>
				<DeleteWarningModal
					modelType="category"
					onDelete={() => handleCategoryDelete()}
					opened={deleteModalOpened}
					toggleOpen={setDeleteModalOpened}
				/>
				<CategoryList
					categories={categories?.body}
					toggleEdit={toggleCategoryEdit}
					toggleDelete={toggleCategoryDelete}
					toggleAdd={toggleCategoryAdd}
				/>
			</>
		);
	}

	// Returns the product form for managing the product edit and add
	return (
		<>
			{shouldShowForm && (
				<CategoryManager
					activeCategory={activeCategory as ProductCategory}
					crudState={crudState}
					categoryApiState={categoryApiState}
					handleCancel={handleCancel}
					handleCategoryUpdate={handleCategoryUpdate}
				/>
			)}
		</>
	);
};

export default CategoryContent;
