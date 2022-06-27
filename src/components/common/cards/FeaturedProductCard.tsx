import { ActionIcon, Card, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { CurrencyRupee, Heart, ShoppingCart, ZoomIn } from "tabler-icons-react";
import React from "react";

const FeaturedProductCard = () => {
	const { hovered, ref } = useHover();

	console.log("Is Hovered ???", hovered);

	{
		/* {hovered && <div className="absolute top-0 left-1"></div>} */
	}
	return (
		<Card ref={ref} className={`relative shadow-lg w-72 ${hovered ? "bg-card-highlight" : "bg-white"}`}>
			<Card.Section className="h-64 bg-violet-light"></Card.Section>
			{hovered && (
				<div className="absolute flex flex-row space-x-4 top-2 left-2">
					<ActionIcon>
						<ShoppingCart size={16} />
					</ActionIcon>
					<ActionIcon>
						<Heart size={16} />
					</ActionIcon>
					<ActionIcon>
						<ZoomIn size={16} />
					</ActionIcon>
				</div>
			)}
			<div className={`flex flex-col items-center pt-2 space-y-4 `}>
				<Text className={`font-sans text-lg font-bold ${hovered ? "text-white" : "text-pink"} `}>Product 1</Text>
				<Text className={`text-sm ${hovered ? "text-white" : "text-dark-blue"}`}>Code - Y523201</Text>
				<span className={`flex flex-row items-center ${hovered ? "text-white" : "text-dark-blue"}`}>
					<CurrencyRupee size="20" />
					<Text>650</Text>
				</span>
			</div>
		</Card>
	);
};

export default FeaturedProductCard;
