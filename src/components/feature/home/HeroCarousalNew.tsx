import React, { useRef } from "react";
import { Image } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { getImageUrl } from "@/helpers/supabase-helper";
import Slider, { Settings } from "react-slick";

type HomeCarousalProps = {
	carousalContent: Array<HomeCarousal>;
};

export const HomeCarousalNew = (props: HomeCarousalProps) => {
	const { carousalContent } = props;
	const isMobile = useMediaQuery("(max-width:600px)");

	var settings: Settings = {
		dots: true,
		infinite: true,
		slidesToScroll: 1,
		initialSlide: 1,
		autoplay: true,
		speed: 600,
		autoplaySpeed: 10000,
		pauseOnHover: true,
		swipeToSlide: true,
	};

	const carousalItems = carousalContent.map((hero, index) => {
		const uniqueKey = `${(index + 99) * 55}_carousal_image`;

		const heroImageUrl = getImageUrl(hero.sourceURI);

		return (
			<div key={uniqueKey}>
				<Image
					key={uniqueKey}
					width="100%"
					// className="-mt-16 md:mt-0"
					classNames={{
						figure: "w-screen h-screen",
					}}
					height="100vh"
					alt="home_carousal"
					src={heroImageUrl}
					fit="cover"
				/>
			</div>
		);
	});

	// TODO: Reduce the image quality to improve the performance
	return <Slider {...settings}>{carousalItems}</Slider>;
};
