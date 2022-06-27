import { Title } from "@mantine/core";
import React from "react";
import FeaturedProductCard from "../../common/cards/FeaturedProductCard";

const FeaturedProducts = () => {
	return (
		<div className="container flex flex-col items-center justify-center mx-auto mt-32">
			<Title className="text-5xl text-page">Featured Products</Title>
			<div className="flex mt-12 space-x-4 flex-nowrap">
				<FeaturedProductCard />
				<FeaturedProductCard />
				<FeaturedProductCard />
				<FeaturedProductCard />
			</div>
		</div>
	);
};

export default FeaturedProducts;
