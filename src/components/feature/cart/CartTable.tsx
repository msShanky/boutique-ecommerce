import { Image, Table, Text } from "@mantine/core";
import React from "react";
import { useAppSelector } from "../../../app/hooks";
import { getSellingPrice } from "../../../helpers/price-calculator";

const CartTable = () => {
	const { products } = useAppSelector((state) => state.cart);

	const rows = products.map((productState: CartProduct) => {
		const { product, variant, quantity } = productState;
		const sellingPrice = getSellingPrice(product);

		const { id, images } = product;

		const baseImage = images && images.length > 0 ? (images[0] as string) : "";

		console.log(baseImage);

		return (
			<tr key={id}>
				<td className="flex flex-row space-x-2">
					<Image src={baseImage} alt={`Product Image ${id}`} width={83} height={87} fit="contain" />
					<div>
						<Text className="text-sm text-violet">Selected Size:</Text>
						<Text className="text-lg">{variant.size}</Text>
					</div>
				</td>
				<td>{sellingPrice}</td>
				<td>{quantity}</td>
				<td>{quantity * sellingPrice}</td>
			</tr>
		);
	});
	return (
		<Table className="w-7/12">
			<thead>
				<tr>
					<th className="text-xl font-bold text-highlight-dark-blue">Product</th>
					<th className="text-xl font-bold text-highlight-dark-blue">Price</th>
					<th className="text-xl font-bold text-highlight-dark-blue">Quantity</th>
					<th className="text-xl font-bold text-highlight-dark-blue">Total</th>
				</tr>
			</thead>
			<tbody>{rows}</tbody>
		</Table>
	);
};

export default CartTable;
