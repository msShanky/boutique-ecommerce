import { ActionIcon, Card, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconCurrencyRupee, IconHeart, IconShoppingCart, IconZoomIn } from "@tabler/icons";
import React from "react";

const FeaturedProductCard = () => {
	const { hovered, ref } = useHover();

	return (
		<Card ref={ref} className={`relative shadow-lg w-72 ${hovered ? "bg-card-highlight" : "bg-white"}`}>
			<Card.Section className="h-64 bg-violet-light"></Card.Section>
			{hovered && (
				<div className="absolute flex flex-row space-x-4 top-2 left-2">
					<ActionIcon>
						<IconShoppingCart size={16} />
					</ActionIcon>
					<ActionIcon>
						<IconHeart size={16} />
					</ActionIcon>
					<ActionIcon>
						<IconZoomIn size={16} />
					</ActionIcon>
				</div>
			)}
			<div className={`flex flex-col items-center pt-2 space-y-4 `}>
				<Text className={`font-sans text-lg font-bold ${hovered ? "text-white" : "text-pink"} `}>Product 1</Text>
				<Text className={`text-sm ${hovered ? "text-white" : "text-dark-blue"}`}>Code - Y523201</Text>
				<span className={`flex flex-row items-center ${hovered ? "text-white" : "text-dark-blue"}`}>
					<IconCurrencyRupee size="20" />
					<Text>650</Text>
				</span>
			</div>
		</Card>
	);
};

export default FeaturedProductCard;
