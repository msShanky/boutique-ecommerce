import { Button, Image, Table, Text } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons";
import React from "react";
import { increaseQuantity, decreaseQuantity } from "reducer/cart";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getSellingPrice } from "../../../helpers/price-calculator";

const CartTable = () => {
	const { products } = useAppSelector((state) => state.cart);
	const dispatch = useAppDispatch();

	const rows = products.map((productState: CartProduct, index: number) => {
		const { product, variant, quantity } = productState;
		const sellingPrice = getSellingPrice(product);
		const { id, images } = product;
		const baseImage = images && images.length > 0 ? (images[0] as string) : "";

		const handleQuantityUpdate = () => {};

		return (
			<tr key={`PRODUCT_${id}_suffix_${(index + 5) * 255}_`}>
				<td className="flex flex-row space-x-2">
					<Image src={baseImage} alt={`Product Image ${id}`} width={83} height={87} fit="contain" />
					<div>
						<Text className="text-sm text-violet">Selected Size:</Text>
						<Text className="text-lg">{variant.size}</Text>
					</div>
				</td>
				<td>{sellingPrice}</td>
				{/* TODO: Quantity should be adjustable */}
				{/* TODO: If quantity is less than zero then remove the product from cart */}
				<td>
					<Button.Group className="flex items-center">
						<Button onClick={() => dispatch(decreaseQuantity(productState))} variant="default">
							<IconMinus size="15" />
						</Button>
						<div className="border w-12 h-9 flex items-center justify-center">
							<Text className=" text-center align-middle ">{quantity}</Text>
						</div>
						<Button onClick={() => dispatch(increaseQuantity(productState))} variant="default">
							<IconPlus size="15" />
						</Button>
					</Button.Group>
				</td>
				{/* TODO: Price should be updated as per the quantity  */}
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
