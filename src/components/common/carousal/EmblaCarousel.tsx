/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./EmblaCarouselThumbsButton";
import { getImageUrl } from "@/helpers/supabase-helper";

type PropType = {
	slides: string[];
	options?: any;
};

export const EmblaCarousel: React.FC<PropType> = (props) => {
	const { slides, options } = props;
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [emblaMainRef, emblaMainApi] = useEmblaCarousel({
		loop: true,
	});
	const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
		containScroll: "keepSnaps",
		dragFree: true,
	});

	const onThumbClick = useCallback(
		(index: number) => {
			if (!emblaMainApi || !emblaThumbsApi) return;
			emblaMainApi.scrollTo(index);
		},
		[emblaMainApi, emblaThumbsApi]
	);

	const onSelect = useCallback(() => {
		if (!emblaMainApi || !emblaThumbsApi) return;
		setSelectedIndex(emblaMainApi.selectedScrollSnap());
		emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
	}, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

	useEffect(() => {
		if (!emblaMainApi) return;
		onSelect();
		emblaMainApi.on("select", onSelect);
		emblaMainApi.on("reInit", onSelect);
	}, [emblaMainApi, onSelect]);

	useEffect(() => {
		const intervalId = setInterval(() => {
			const maxSliderIndex = slides.length - 1;
			setSelectedIndex((prevCount) => {
				if (prevCount + 1 === maxSliderIndex) return 0;
				return prevCount + 1;
			});
		}, 5000); // Increment count every 1000ms (1 second)

		// Cleanup function to clear the interval when the component unmounts
		return () => {
			clearInterval(intervalId);
		};
	}, []);

	return (
		<div className="embla">
			<div className="embla__viewport" ref={emblaMainRef}>
				<div className="embla__container">
					{slides.map((slideImage, index) => (
						<div className="embla__slide" key={index}>
							<div className="embla__slide__number">
								<span>{index + 1}</span>
							</div>
							<img className="embla__slide__img" src={getImageUrl(slides[selectedIndex])} alt="product_image" />
						</div>
					))}
				</div>
			</div>

			<div className="embla-thumbs">
				<div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
					<div className="embla-thumbs__container">
						{slides.map((slideImage, index) => (
							<Thumb
								onClick={() => onThumbClick(index)}
								selected={index === selectedIndex}
								index={index}
								imgSrc={getImageUrl(slideImage)}
								key={index}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
