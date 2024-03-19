import React from "react";
import { Title } from "@mantine/core";
import Slider, { Settings } from "react-slick";
import { FeaturedProductCard } from "@/components/common/cards";
import { useWishlist } from "hooks";
import { useUser } from "@supabase/auth-helpers-react";
import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react";

/**
 * Featured section would consist of the featured topics or styles defined by the admin
 * https://www.kalkifashion.com/ reference the section above shop by category
 */

type CarousalCardSliderProps = {
	items: Array<ProductWithRelations>;
};

const NextArrow = (props: any) => {
	const { className, onClick } = props;
	return (
		<div
			className={`${className} bg-primary flex justify-center items-center hover:bg-primaryAlt hover:text-primary w-12 h-24 text-black before:hidden after:hidden z-30 -right-2`}
			onClick={onClick}
		>
			<IconChevronRight />
		</div>
	);
};

const PrevArrow = (props: any) => {
	const { className, onClick } = props;
	return (
		<div
			className={`${className} bg-primary flex justify-center items-center hover:bg-primaryAlt hover:text-primary text-black w-12 h-24 rounded-none border-none before:hidden after:hidden z-30 -left-2`}
			onClick={onClick}
		>
			<IconChevronLeft />
		</div>
	);
};

export const CarousalCardSliderNew = (props: CarousalCardSliderProps) => {
	const { items } = props;
	const { user } = useUser();
	const { wishlist, handleWishlist } = useWishlist(user?.id);

	const settings: Settings = {
		dots: true,
		arrows: true,
		autoplay: true,
		slidesToShow: 4,
		slidesToScroll: 4,
		autoplaySpeed: 8000,
		pauseOnHover: true,
		pauseOnFocus: true,
		speed: 600,
		touchMove: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
	};

	const itemCards =
		items &&
		items.map((product, index) => {
			const isWishlisted = wishlist.includes(product.id);
			const uniqueKey = `unique_card_carousal_${(index + 46) * 99}_${product.id}}`;
			return (
				<FeaturedProductCard
					key={uniqueKey}
					handleWishList={() => handleWishlist(product)}
					product={product}
					isWishlisted={isWishlisted}
				/>
			);
		});

	return (
		<div className="container flex flex-col items-center justify-center gap-6 pb-12 mx-auto my-10">
			<Title className="mb-12 font-sans text-3xl md:text-5xl text-primaryBlack font-extralight">
				Featured Products
			</Title>
			<div className="w-full slider-container">
				<Slider {...settings}>{itemCards}</Slider>
			</div>
			{/* For mobile devices */}
		</div>
	);
};
