import { Button, Divider, Image, Loader, Text, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import type { GetStaticPropsContext, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { IconHeart, IconShoppingCart } from "@tabler/icons";
import { useAppDispatch } from "../../../../app/hooks";
import { AppLayout } from "@/components/layout";
// import AppLayout from "../../../../components/layout/AppLayout";
import { useGetProductsByCodeQuery } from "../../../../reducer/breezeBaseApi";
import { addProductToCart } from "../../../../reducer/cart";
import { definitions } from "../../../../types/supabase";
import { getSellingPrice } from "helpers/price-calculator";
import { getImageUrl } from "helpers/supabase-helper";
import { useWishlist } from "hooks";
import { Carousel } from "@mantine/carousel";
import { getAllProductSlugs, getProductDetailsForSlugs } from "@/helpers/static_builder/productsHandler";
import { getCategoryMenuLinks } from "@/helpers/static_builder";

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

	// const { category, product_id } = router.query;
	// const { isLoading, data, isSuccess } = useGetProductsByCodeQuery({
	// 	categoryName: category as string,
	// 	productCode: product_id as string,
	// });

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

	const renderImages = (product: ProductWithRelations, withCarousel?: boolean) => {
		const ProductImage = ({ src }: { src: string }) => (
			<Image
				className="w-[49%] object-top"
				height={680}
				radius="md"
				fit="contain"
				classNames={{
					imageWrapper: "overflow-hidden",
					image: "hover:scale-125 delay-75 transition-transform ease-in-out",
				}}
				src={getImageUrl(src)}
				alt={`product_image_`}
			/>
		);

		return withCarousel ? (
			<Carousel slideSize="70%" height={680} slideGap="sm" controlsOffset="xs" controlSize={20}>
				{product?.images?.map((image, index) => {
					return (
						<Carousel.Slide key={`Product_image_${index + 5}`}>
							<ProductImage src={image as string} />
						</Carousel.Slide>
					);
				})}
			</Carousel>
		) : (
			product?.images?.map((image, index) => {
				return <ProductImage key={`Product_image_${index + 5}`} src={image as string} />;
			})
		);
	};

	return (
		<AppLayout pageTitle="Breeze Boutique | Product" menuLinks={props.menuLinks}>
			<>
				<section className="container flex flex-wrap mx-auto my-20">
					<div className="w-8/12 p-1">
						<div className="relative flex flex-wrap gap-5 overflow-hidden ">
							{renderImages(product as ProductWithRelations, !!((product?.images?.length as number) > 2))}
						</div>
					</div>
					<div className="w-4/12 px-4 py-2">
						<Title order={1} className="font-sans text-4xl text-primary">
							{product?.title}
						</Title>
						<Text className="mt-4 font-sans text-xl text-violet-subtext">{product?.sub_title}</Text>
						<Divider my="md" />
						<div className="flex items-center mt-8 space-x-4">
							<Text className="font-sans text-2xl text-primary">
								Rs. {getSellingPrice(product as ProductWithRelations)}
							</Text>
							<Text className="font-sans text-xl line-through text-pink">Rs. {product?.msrp}</Text>
							<Text className="font-sans text-xl text-violet">{`(${product?.product_discount}% OFF)`}</Text>
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
											className={`rounded-full min-w-14 h-14 border-pink  hover:bg-pink hover:text-white ${
												isSelected ? "bg-pink text-white" : "text-pink"
											}`}
										>
											{variant.size}
										</Button>
									);
								})}
							</div>
							{cartErrorState && <p className="font-sans text-red-600">Please select a size</p>}
						</div>

						<div className="flex justify-between w-full mt-12 min-w-14">
							<Button
								classNames={{ label: "space-x-2" }}
								className="flex justify-center w-64 h-12 items-top bg-pink hover:bg-opacity-80 hover:bg-pink"
								onClick={handleAddToCart}
							>
								<div>
									<IconShoppingCart size={20} />
								</div>
								<Text>Add To Cart</Text>
							</Button>
							<Button
								classNames={{ label: "space-x-2" }}
								className={`w-48 h-12 border-2 border-violet text-violet hover:bg-transparent hover:border-black hover:text-black ${
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
				{/* )} */}
			</>
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
