import React from "react";

type FeaturedItem = {
	image_url: string;
	label: string;
	link: string;
};

type FeatureSectionProps = {
	featured: Array<FeaturedItem>;
};

/**
 * Static Features where only static number of cards are visible and will all the items in 
 */

export const FeatureSection = (props: FeatureSectionProps) => {
	const { featured } = props;
	return (
		<div>
			{featured.map((item, index) => {
				const uniqueKey = `${(index + 5) * 45}`;
				return <div key={uniqueKey}></div>;
			})}
		</div>
	);
};
