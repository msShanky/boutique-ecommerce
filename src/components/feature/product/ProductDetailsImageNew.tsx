import { EmblaCarousel } from "@/components/common/carousal";
// import { EmblaOptionsType } from "embla-carousel-react";
import React, { FC } from "react";
import Slider from "react-slick";

type ProductDetailsImageProps = {
	product: ProductWithRelations;
};

// const OPTIONS: EmblaOptionsType = {
// 	loop: true,
// };

export const ProductDetailsImageNew: FC<ProductDetailsImageProps> = ({ product }) => {
	const { images } = product;

	const settings = {
		customPaging: (i: number) => {
			const imageValue = images ? images[i] : "";
			return (
				<a>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img src={`${imageValue}`} alt="Product thumbnail" />
				</a>
			);
		},
		dots: true,
		dotsClass: "slick-dots slick-thumb",
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	if (!images || images?.length <= 0) return null;

	// return <EmblaCarousel slides={images} options={OPTIONS} />;
	return (
		<Slider {...settings}>
			{images.map((image) => {
				return (
					<div key={`${image}`}>
						<img src={image} />
					</div>
				);
			})}
		</Slider>
	);
};
