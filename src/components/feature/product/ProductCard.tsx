import { ActionIcon, Card, Image, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React, { FunctionComponent, useState } from "react";
import { CurrencyRupee, ShoppingCart } from "tabler-icons-react";

type ProductCardProps = {
	product: Product;
	handleAddToCart: (selectedSize: string) => void;
	handleWishList: () => void;
};

const ProductCard: FunctionComponent<ProductCardProps> = (props) => {
	const { handleAddToCart } = props;
	const { id, image, price, size } = props.product;
	const [selectedSize, setSelectedSize] = useState("");

	return (
		<Card className={`relative shadow-lg w-72 `}>
			<Card.Section className="h-64 bg-violet-light">
				<Image height={256} src={image} alt={`PRODUCT_${id}`} fit="contain" />
			</Card.Section>
			<div className="absolute flex flex-row space-x-4 top-2 left-2">
				<ActionIcon
					onClick={() => {
						if (selectedSize) {
							handleAddToCart(selectedSize);
							showNotification({
								title: "Added product to cart ",
								message: "product has been added to cart!",
								color: "green",
							});
						} else {
							showNotification({
								title: "Select An Available Size ",
								message: "Hey there, please select an available size to add this product to cart!",
								color: "red",
							});
						}
					}}
				>
					<ShoppingCart size={20} />
				</ActionIcon>
			</div>
			<div className={`flex flex-col items-center pt-2 space-y-4 mt-2`}>
				<span className={`flex flex-row items-center`}>
					<CurrencyRupee size="20" />
					<Text className="font-bold">{price}</Text>
				</span>
			</div>
			<div>
				<Text className="mb-4 text-sm text-violet">Sizes:</Text>
				<div className="flex flex-row space-x-4">
					{size.map((size) => {
						const isSizeSelected = size === selectedSize;
						return (
							<ActionIcon
								onClick={() => setSelectedSize(size)}
								className={`p-2 ${isSizeSelected && "bg-violet-light"}`}
								key={size}
							>
								<Text className={`text-sm font-bold ${isSizeSelected ? "text-violet" : "text-card-highlight"} `}>
									{size}
								</Text>
							</ActionIcon>
						);
					})}
				</div>
			</div>
		</Card>
	);
};

export default ProductCard;
