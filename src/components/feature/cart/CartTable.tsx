import { ActionIcon, Button, Image, Table, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { getImageUrl } from "helpers/supabase-helper";
import React, { FC } from "react";
import { increaseQuantity, decreaseQuantity } from "reducer/cart";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getSellingPrice } from "../../../helpers/price-calculator";
import { DeleteWarningModal } from "@/components/feature/admin/warning";
import { useDisclosure } from "@mantine/hooks";

type SelectedSizeProps = {
	variantText: string;
};

const styles = {
	variantDesktop: `rounded-full w-10 text-md h-10 capitalize border-primaryBlack text-primaryBlack bg-primary flex justify-center items-center absolute md:flex`,
};

const SelectedSize: FC<SelectedSizeProps> = ({ variantText }) => {
	return (
		// <div className={styles.variantDesktop}>
		<div
			className={`rounded-full md:w-10 md:text-md text-xs md:h-10 h-8 w-8 capitalize border-primaryBlack text-primaryBlack bg-primary justify-center 
			items-center flex`}
		>
			<Text>{variantText}</Text>
		</div>
	);
};

const CartTable = () => {
	const { products } = useAppSelector((state) => state.cart);

	const [opened, { open, close }] = useDisclosure(false);
	const dispatch = useAppDispatch();

	const rows = products.map((productState: CartProduct, index: number) => {
		const { product, variant, quantity } = productState;
		const sellingPrice = getSellingPrice(product);
		const { id, images } = product;
		const baseImage = getImageUrl(images && images.length > 0 ? (images[0] as string) : "");

		const handleQuantityDecrease = () => {
			if (quantity > 1) {
				dispatch(decreaseQuantity(productState));
				return;
			}
			open();
		};

		const confirmRemovalOfProduct = () => {
			dispatch(decreaseQuantity(productState));
			close();
		};

		return (
			<tr key={`PRODUCT_${id}_suffix_${(index + 5) * 255}_`}>
				<DeleteWarningModal
					modelType="cart"
					onDelete={confirmRemovalOfProduct}
					opened={opened}
					toggleOpen={(isClose) => !isClose && close()}
				/>
				<td className="flex flex-row space-x-2">
					<div className="relative flex flex-row">
						<Image src={baseImage} alt={`Product Image ${id}`} width={100} height={100} fit="contain" />
						{/* TODO: [4] [GoodToHave] A user should be able to change the variant of the product in cart page */}
						<div className="absolute bottom-0 right-0 md:flex md:flex-row">
							<SelectedSize variantText={variant?.size ?? ""} />
						</div>
					</div>
				</td>
				<td>{sellingPrice}</td>
				<td>
					<Button.Group className="flex items-center">
						<ActionIcon onClick={handleQuantityDecrease} className="h-9">
							<IconMinus size="1.125rem" />
						</ActionIcon>
						<div className="flex items-center justify-center w-8 border md:w-12 h-9">
							<Text className="text-center align-middle ">{quantity}</Text>
						</div>
						<ActionIcon onClick={() => dispatch(increaseQuantity(productState))} className="h-9">
							<IconPlus size="1.125rem" />
						</ActionIcon>
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
					<th className="text-xl font-bold text-primary">Product</th>
					<th className="text-xl font-bold text-primary">Price</th>
					<th className="text-xl font-bold text-primary">Quantity</th>
					<th className="text-xl font-bold text-primary">Total</th>
				</tr>
			</thead>
			<tbody>{rows}</tbody>
		</Table>
	);
};

export default CartTable;
