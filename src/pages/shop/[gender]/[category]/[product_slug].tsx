import { Button, Divider, Image, Loader, Text, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import type { GetStaticPropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { IconHeart, IconShoppingCart } from "@tabler/icons";
import { useAppDispatch } from "../../../../app/hooks";
import { AppLayout } from "@/components/layout";
import { addProductToCart } from "../../../../reducer/cart";
import { definitions } from "../../../../types/supabase";
import { getSellingPrice } from "helpers/price-calculator";
import { getImageUrl } from "helpers/supabase-helper";
import { useWishlist } from "hooks";
import { Carousel } from "@mantine/carousel";
import { getAllProductSlugs, getProductDetailsForSlugs } from "@/helpers/static_builder/productsHandler";
import { getCategoryMenuLinks } from "@/helpers/static_builder";
import { PriceWithDiscount, ProductDetailsImage } from "@/components/feature/product";

type ProductPageProps = {
	menuLinks: Array<MenuLinkPropTypes>;
	productDetails: ProductWithRelations;
};

const ProductPage: NextPage<ProductPageProps> = (props) => {
	const dispatch = useAppDispatch();
	const { user } = useUser();
	const router = useRouter();

	const [selectedVariant, setVariant] = useState<definitions["product_variant"]>();
	const [cartErrorState, setCartErrorState] = useState<boolean>(false);

	const { wishlist, handleWishlist } = useWishlist(user?.id);

	const product = props.productDetails;

	const isWishlisted = wishlist.includes(product?.id || 0);

	const _mrp = product?.msrp as number;
	const discountPrice = _mrp * ((product?.product_discount as number) / 100);
	const productPrice = _mrp - parseInt(discountPrice?.toFixed(), 10);

	const handleVariantSelection = (variant: definitions["product_variant"]) => {
		setVariant(variant);
		setCartErrorState(false);
	};

	const handleAddToCart = () => {
		if (!selectedVariant) {
			setCartErrorState(true);
			return;
		} else {
			setCartErrorState(false);
		}
		dispatch(addProductToCart({ product: product as ProductWithRelations, variant: selectedVariant }));
		showNotification({
			title: "Added Product",
			message: `${product?.title} has been added, and size selected is ${selectedVariant.size}`,
		});
	};
	
	return (
		<AppLayout pageTitle="Breeze Boutique | Product" menuLinks={props.menuLinks}>
			<section className="container flex flex-col flex-wrap items-center mx-auto my-20 lg:items-start lg:flex-row">
				<div className="w-full p-1 lg:w-8/12">
					<ProductDetailsImage product={product} />
				</div>
				<div className="w-full px-4 py-2 lg:w-4/12">
					<Title order={1} className="font-sans text-4xl text-primary">
						{product?.title}
					</Title>
					<Text className="mt-4 font-sans text-xl text-violet-subtext">{product?.sub_title}</Text>
					<Divider my="md" />
					<div className="flex items-center mt-6 space-x-4">
						<Text className="font-sans text-xl text-primaryBlack">Rs. {getSellingPrice(product)}</Text>
						<Text className="font-sans text-xl line-through text-primary">Rs. {product?.msrp}</Text>
						{product?.product_discount && (
							<Text className="font-sans text-xl text-success">{`(${product?.product_discount}% OFF)`}</Text>
						)}
					</div>
					<div className="flex flex-col mt-8 space-y-4">
						<Text className="font-sans text-lg font-semibold uppercase text-dark-blue">Select Size:</Text>
						<div className={`flex mt-8 space-x-4 animate-pulse`}>
							{product?.variants?.map((variant) => {
								const variantKey = `variant_key_${variant.id}`;
								const isSelected = selectedVariant?.id === variant.id;
								return (
									<Button
										key={variantKey}
										onClick={() => handleVariantSelection(variant)}
										disabled={!variant.inventory_count}
										className={`rounded-full min-w-14 text-md h-14 capitalize border-primaryBlack text-primaryBlack hover:bg-primary ${
											isSelected && "bg-primary"
										}`}
									>
										{variant.size}
									</Button>
								);
							})}
						</div>
						{cartErrorState && <p className="font-sans text-red-600">Please select a size</p>}
					</div>

					<div className="flex flex-col items-center justify-between w-full gap-4 mt-12 lg:flex-row min-w-14">
						<Button
							classNames={{ label: "space-x-2" }}
							className="flex justify-center w-10/12 h-12 lg:w-64 items-top bg-primary hover:bg-opacity-80 hover:bg-primary/60"
							onClick={handleAddToCart}
						>
							<div>
								<IconShoppingCart size={20} className="stroke-primaryBlack" />
							</div>
							<Text className="text-primaryBlack">Add To Cart</Text>
						</Button>
						<Button
							classNames={{ label: "space-x-2" }}
							className={`h-12 w-10/12 lg:w-64 border-2 border-primaryBlack text-primaryBlack hover:bg-transparent hover:border-primary hover:text-black ${
								isWishlisted && "bg-violet text-white"
							}`}
							onClick={() => product && handleWishlist(product)}
						>
							<div>
								<IconHeart size={20} />
							</div>
							<Text>{isWishlisted ? "Wishlisted" : "Wishlist"}</Text>
						</Button>
					</div>
				</div>
			</section>
		</AppLayout>
	);
};

export default ProductPage;

// Generates `/shop/men/[category1]`, `/shop/women/[category1]` and `/shop/kids/[category1]`
export async function getStaticPaths() {
	const productPageSlugs = await getAllProductSlugs();
	const productPaths = productPageSlugs?.map((productSlugs) => {
		const { page_link, gender_group, category } = productSlugs;
		return {
			params: {
				product_slug: page_link,
				gender: gender_group.gender?.toLowerCase(),
				category: category.page_link?.split("/")[1],
			},
		};
	});

	return {
		paths: productPaths,
		fallback: false,
	};
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: GetStaticPropsContext) {
	const menuLinkResponse = await getCategoryMenuLinks();
	if (!context?.params?.product_slug) return null;

	const productDetails = await getProductDetailsForSlugs(context?.params?.product_slug as string);
	// const categoryProps = await getSubCategoriesAndProductsForCategory(context?.params?.category as string);
	return {
		// Passed to the page component as props
		props: { menuLinks: menuLinkResponse, productDetails },
	};
}
