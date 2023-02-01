import React from "react";
import { Image, Text } from "@mantine/core";

type SiteFeatureIcon = {
	icon: string;
	label: string;
	subText: string;
};

export const SiteFeatureIcon = (props: SiteFeatureIcon) => {
	const { icon, label, subText } = props;
	return (
		<div className="flex flex-col items-center gap-y-4">
			<Image width={150} src={`/images/home/icons/${icon}.png`} alt={label.toLowerCase()} />
			<Text className="font-sans uppercase font-xl">{label}</Text>
			<Text className="font-sans font-light font-sm">{subText}</Text>
		</div>
	);
};
