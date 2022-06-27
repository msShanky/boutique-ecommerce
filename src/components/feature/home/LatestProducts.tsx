import { Title } from "@mantine/core";
import React from "react";
import FeaturedProductCard from "../../common/cards/FeaturedProductCard";

const LatestProducts = () => {
	return (
		<div className="container flex flex-col items-center justify-center mx-auto mt-32">
			<Title>Latest Products</Title>
			<div className="flex mt-12 space-x-4 flex-nowrap">
				<FeaturedProductCard />
				<FeaturedProductCard />
				<FeaturedProductCard />
				<FeaturedProductCard />
			</div>
		</div>
	);
};

export default LatestProducts;
