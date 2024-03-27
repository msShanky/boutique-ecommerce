import React from "react";
import { AspectRatio, Image } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
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

		return (
			<div key={uniqueKey} className=" bg-primary/10">
				<AspectRatio ratio={16 / 9} p={0} className="">
					<Image
						key={uniqueKey}
						classNames={{
							figure: "container h-auto",
						}}
						width="100%"
						alt="home_carousal"
						src={hero.sourceURI}
						fit={isMobile ? "scale-down" : "cover"}
					/>
				</AspectRatio>
			</div>
		);
	});

	// TODO: Reduce the image quality to improve the performance
	return (
		<Slider className="mt-[100px]" {...settings}>
			{carousalItems}
		</Slider>
	);
};
