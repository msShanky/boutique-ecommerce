import { Card, Text, Title, Image } from "@mantine/core";
import React, { FunctionComponent } from "react";

type FeatureCardProps = {
	icon: string;
};

const FeatureCard: FunctionComponent<FeatureCardProps> = (props) => {
	const { icon } = props;
	return (
		<Card className="flex flex-col items-center justify-center w-64 space-y-4 shadow-md h-80">
			<Image width={65} height={65} src={icon} alt={"Feature Icon"} />
			<Title className="text-2xl font-semibold text-primary">Support Feature</Title>
			<Text className="text-base text-center text-primary text-opacity-30">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.</Text>
		</Card>
	);
};

const SiteFeatures = () => {
	return (
		<div className="container flex flex-col items-center justify-center mx-auto mt-32">
			<Title className="text-5xl text-primary">What We Offer</Title>
			<section className="flex flex-row mt-12 space-x-4">
				<FeatureCard icon="/images/free-delivery.png" />
				<FeatureCard icon="/images/premium-quality.png" />
				<FeatureCard icon="/images/cashback.png" />
				<FeatureCard icon="/images/24-hours-support.png" />
			</section>
		</div>
	);
};

export default SiteFeatures;
