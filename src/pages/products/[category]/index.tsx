import { Loader, Pagination, Title } from "@mantine/core";
import { useUser } from "@supabase/auth-helpers-react";
import { useWishlist } from "hooks";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductCard from "../../../components/feature/product/ProductCard";
import AppLayout from "../../../components/layout/AppLayout";
import { useLazyGetProductsByCategoryNameQuery } from "../../../reducer/breezeBaseApi";

const PAGE_ITEMS = 8;

const Product: NextPage = () => {
	const router = useRouter();
	const { user } = useUser();
	const { category } = router.query;
	const { wishlist, handleWishlist } = useWishlist(user?.id)
	const [currentPage, setCurrentPage] = useState(1)
	const [getProductsByCategoryName, { data: products, isLoading, isSuccess }] = useLazyGetProductsByCategoryNameQuery();


	const handleProductRedirection = (product: ProductWithRelations) => {
		const productRoute = product.code;
		router.push(`${router.asPath}/${productRoute}`);
	};

	const fetchProducts = () => {
		getProductsByCategoryName({ categoryName: category as string, from: ((currentPage - 1) * (PAGE_ITEMS)), to: (currentPage * PAGE_ITEMS) - 1 })
	}

	useEffect(() => {
		if (category) {
			fetchProducts()
		}
	}, [category, currentPage])

	const maxPages = Math.ceil((parseInt(`${products?.count}`) || 0) / PAGE_ITEMS);

	return (
		<AppLayout>
			<>
				<Head>
					<title>Breeze Boutique | Products</title>
				</Head>
				{isLoading && (
					<div className="flex justify-center w-full h-56 mt-20">
						<Loader size={60} />
					</div>
				)}
				{isSuccess && (
					<section className="mt-10 mb-20">
						<Title className="font-sans flex justify-center text-5xl text-black capitalize">{category}</Title>
						<section className="container flex flex-wrap gap-10 mx-auto mt-10 mb-20 justify-center">
							{products?.body &&
								products?.body.map((product) => {
									const isWishlisted = wishlist.includes(product.id)
									return (
										<ProductCard
											handleProductRedirection={() => handleProductRedirection(product)}
											handleWishList={() => handleWishlist(product)}
											product={product}
											isWishlisted={isWishlisted}
											key={product.id}
										/>
									);
								})}
						</section>
						<Pagination
							page={currentPage}
							onChange={setCurrentPage}
							total={maxPages}
							radius="xl"
							withEdges
							position="center"
							styles={() => ({
								item: {
									'&[data-active]': {
										backgroundColor: '#7E33E0'
									}
								}
							})}
						/>
					</section>
				)}
			</>
		</AppLayout>
	);
};

export default Product;
