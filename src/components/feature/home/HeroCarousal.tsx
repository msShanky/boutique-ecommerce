import React, { useRef } from "react";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Image } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const heroImages = [
	{
		sourceURI: "sabesh-photography-dFyjYq92gLk-unsplash.jpg",
		style: "md:mt-[140px]",
	},
	{
		sourceURI: "inesh-thamotharampillai-6XZWrSBo5o4-unsplash.jpg",
		style: "md:mt-[140px]",
	},
	{
		sourceURI: "sabesh-photography-CUhnjt3zbvE-unsplash.jpg",
		style: "md:mt-[140px]",
	},
	// {
	// 	sourceURI: "sabesh-photography-e5J0Etnt23k-unsplash.jpg",
	// 	style: "md:mt-[140px]",
	// },
	{
		sourceURI: "sabesh-photography-xdF8HFa2Id0-unsplash.jpg",
		style: "md:mt-[140px]",
	},
];

export const HomeCarousal = () => {
	const autoplay = useRef(Autoplay({ delay: 4500 }));
	const isMobile = useMediaQuery("(max-width:600px)");

	const carousalItems = heroImages.map((hero, index) => {
		const uniqueKey = `${(index + 99) * 55}_carousal_image`;
		return (
			<Image
				key={uniqueKey}
				width="100%"
				className="-mt-16 md:mt-0"
				classNames={{
					figure: "w-screen h-screen",
				}}
				height="100vh"
				alt="home_carousal"
				src={`/images/home/${hero.sourceURI}`}
				fit="cover"
			/>
		);
	});

	// TODO: Reduce the image quality to improve the performance
	return (
		<Carousel
			height={isMobile ? 760 : 950}
			controlsOffset="lg"
			plugins={[autoplay.current]}
			onMouseEnter={autoplay.current.stop}
			onMouseLeave={autoplay.current.reset}
			loop
			withControls={false}
			withIndicators
			align="center"
			inViewThreshold={0}
			classNames={{
				indicators: "md:bottom-16 bottom-[20%]",
				indicator: "w-10 h-2 bg-primary",
			}}
		>
			{carousalItems}
		</Carousel>
	);
};
