import React, { FunctionComponent, useEffect, useState } from "react";
import { definitions } from "types/supabase";
import { Pagination } from "@mantine/core";
import { usePagination } from "@mantine/hooks";

import { ProductTable } from "@/components/feature/admin";
import { useLazyGetProductsByCategoryNameQuery } from "@/reducer/breezeBaseApi";

import ProductFloatingBar from "./ProductFloatingBar";

type ProductListProps = {
	categories?: Array<definitions["product_category"]>;
	toggleProductAdd: () => void;
	toggleProductEdit: (product: ProductWithRelations) => void;
};

const ITEMS_PER_PAGE = 8;

const ProductList: FunctionComponent<ProductListProps> = (props) => {
	const { categories, toggleProductAdd, toggleProductEdit } = props;
	const [activePage, setPage] = useState(1);
	const [selectedCategory, setSelectedCategory] = useState<definitions["product_category"] | null>();
	const [getProductsForAdmin, results] = useLazyGetProductsByCategoryNameQuery();
	// const pagination = usePagination({ total: results.data?.count || 0, initialPage: 1 });

	const handleCategoryUpdate = (value: definitions["product_category"] | null) => {
		setSelectedCategory(value);
	};

	const handleCategoryChange = (value: string | null) => {
		if (!value) return null;
		const _selectedCategory = categories?.filter((category) => category.id === parseInt(value, 10))[0];
		if (!_selectedCategory) return null;
		handleCategoryUpdate(_selectedCategory);
	};

	useEffect(() => {
		if (selectedCategory) {
			getProductsForAdmin({
				categoryName: selectedCategory.category as string,
				isAdmin: true,
				from: (activePage - 1) * ITEMS_PER_PAGE,
				to: activePage * ITEMS_PER_PAGE - 1,
			});
		}
	}, [selectedCategory, getProductsForAdmin, activePage]);

	useEffect(() => {
		handleCategoryUpdate(categories?.[0] || null);
	}, [categories]);

	const pageCount = Math.ceil((results?.data?.count as number) / ITEMS_PER_PAGE);

	return (
		<>
			<div className="flex items-end space-x-8">
				<ProductFloatingBar
					categories={categories}
					handleCategoryChange={handleCategoryChange}
					toggleProductAdd={toggleProductAdd}
					selectedCategory={selectedCategory?.id.toString() as string}
				/>
			</div>
			{selectedCategory && results.data && (
				<ProductTable
					products={results.data?.body as Array<ProductWithRelations>}
					toggleProductEdit={toggleProductEdit}
				/>
			)}
			{selectedCategory && results.data && (
				<Pagination total={pageCount} initialPage={1} page={activePage} onChange={setPage} className="justify-center" />
			)}
		</>
	);
};

export default ProductList;
