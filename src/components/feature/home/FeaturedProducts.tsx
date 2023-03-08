import { Title } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import React from "react";
import { FeaturedProductCard } from "@/components/common/cards";
import { definitions } from "types/supabase";
import { useWishlist } from "hooks";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

/**
 * Featured section would consist of the featured topics or styles defined by the admin
 * https://www.kalkifashion.com/ reference the section above shop by category
 */

type CarousalCardSliderProps = {
	items: Array<definitions["product"]>;
};

export const CarousalCardSlider = (props: CarousalCardSliderProps) => {
	const { items } = props;
	const { user } = useUser();
	const router = useRouter();
	const { wishlist, handleWishlist } = useWishlist(user?.id);

	const handleProductRedirection = (product: ProductWithRelations) => {
		const { gender_group, category, page_link } = product;

		if (!page_link) return;

		const productSlug = `/shop/${gender_group?.gender?.toLowerCase()}/${
			category?.page_link?.split("/")[1]
		}/${page_link}`;
		router.push(productSlug);
	};

	const itemCards =
		items &&
		items.map((product, index) => {
			const isWishlisted = wishlist.includes(product.id);
			const uniqueKey = `unique_card_carousal_${(index + 46) * 99}_${product.id}}`;
			return (
				<Carousel.Slide key={uniqueKey}>
					<FeaturedProductCard
						handleProductRedirection={() => handleProductRedirection(product)}
						handleWishList={() => handleWishlist(product)}
						product={product}
						isWishlisted={isWishlisted}
						key={product.id}
					/>
				</Carousel.Slide>
			);
		});

	return (
		<div className="container flex flex-col items-center justify-center gap-6 pb-12 mx-auto my-10">
			<Title className="mb-12 font-sans text-3xl md:text-5xl text-primaryBlack font-extralight">
				Featured Products
			</Title>
			{/* For mobile devices */}
			<Carousel
				className="bg-opacity-25 md:hidden"
				sx={{ maxWidth: 344 }}
				classNames={{
					control: "bg-primary/90 w-10 h-20 rounded-none border-none ",
					indicator: "bg-primary",
				}}
				mx="auto"
				withIndicators
				height={"100%"}
				controlsOffset={0}
				slidesToScroll={1}
				slideSize={1}
				slideGap={20}
				loop
			>
				{itemCards}
			</Carousel>
			{/* For desktop devices */}
			<Carousel
				className="hidden w-full md:flex"
				classNames={{
					control: "bg-primary/90 w-10 h-20 rounded-none border-none ",
					indicator: "bg-primary",
				}}
				mx="auto"
				withIndicators
				height={"100%"}
				controlsOffset={0}
				slidesToScroll={4}
				slideSize={4}
				slideGap={40}
				loop
			>
				{itemCards}
			</Carousel>
		</div>
	);
};
