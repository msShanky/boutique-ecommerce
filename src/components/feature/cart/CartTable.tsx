import { Image, Table, Text } from "@mantine/core";
import React from "react";
import { useAppSelector } from "../../../app/hooks";

const elements = [
	{ position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
	{ position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
	{ position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
	{ position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
	{ position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
];

const CartTable = () => {
	const { products } = useAppSelector((state) => state.cart);

	const rows = products.map((product) => {
		const { image, price, quantity, selectedSize, id } = product;
		return (
			<tr key={product.id}>
				<td className="flex flex-row space-x-2">
					<Image src={image} alt={`Product Image ${id}`} width={83} height={87} fit="contain" />
					<div>
						<Text className="text-sm text-violet">Selected Size:</Text>
						<Text className="text-lg">{selectedSize}</Text>
					</div>
				</td>
				<td>{price}</td>
				<td>{quantity}</td>
				<td>{quantity * price}</td>
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
