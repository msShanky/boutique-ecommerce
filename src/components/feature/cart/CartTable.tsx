import { ActionIcon, Button, Image, Table, Text } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { getImageUrl } from "helpers/supabase-helper";
import React, { FC } from "react";
import { increaseQuantity, decreaseQuantity, cartTotalSelector } from "reducer/cart";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getSellingPrice } from "../../../helpers/price-calculator";
import { DeleteWarningModal } from "@/components/feature/admin/warning";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";

type SelectedSizeProps = {
	variantText: string;
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
	const state = useAppSelector((state) => state);
	const cartTotal = cartTotalSelector(state);

	const rows = products.map((productState: CartProduct, index: number) => {
		const { product, variant, quantity, addOn } = productState;
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
				<td className="flex flex-row flex-grow">
					<div className="relative flex flex-row">
						<Image src={baseImage} alt={`Product Image ${id}`} width={100} height={100} fit="contain" />
						{/* TODO: [4] [GoodToHave] A user should be able to change the variant of the product in cart page */}
						<div className="absolute bottom-0 right-0 md:flex md:flex-row">
							<SelectedSize variantText={variant?.size ?? ""} />
						</div>
					</div>
				</td>
				{addOn && (
					<td className="">
						<div className="flex flex-col items-center gap-2 md:flex-row">
							<p className="text-xs md:text-base">{addOn?.label}</p>
							<p className="p-0 m-0 text-xs whitespace-nowrap">
								&#40;<span className="text-sm text-green-500 md:text-lg">+ {addOn?.price}</span>&#41;
							</p>
						</div>
					</td>
				)}
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
				<td>{addOn?.price ? quantity * (addOn?.price + sellingPrice) : sellingPrice}</td>
			</tr>
		);
	});

	return (
		<section className="flex flex-col w-full min-h-[65vh] gap-4 md:w-7/12 relative">
			<Table className="">
				<thead>
					<tr>
						<th className="text-xl font-bold text-primary">Product</th>
						{products.length > 0 && products.some((row) => Object.hasOwn(row, "addOn")) && (
							<th className="text-xl font-bold text-primary">AddOn</th>
						)}
						<th className="text-xl font-bold text-primary">Price</th>
						<th className="text-xl font-bold text-primary">Quantity</th>
						<th className="text-xl font-bold text-primary">Total</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</Table>

			<div className="absolute bottom-0 flex flex-col-reverse items-center w-full gap-2 md:justify-between md:flex-row">
				<div className="flex w-full md:w-3/12">
					<Link href="/checkout" passHref>
						<Button className="w-full text-white bg-success active:bg-primary hover:text-primaryBlack active:text-primaryBlack">
							Proceed To Checkout
						</Button>
					</Link>
				</div>
				<div className="flex items-center self-end justify-end w-full px-4 py-2 text-black align-bottom rounded-full md:w-4/12 bg-primary gap-x-8">
					<p>Total</p>
					<p className="text-xl font-bold">Rs.{cartTotal}</p>
				</div>
			</div>
		</section>
	);
};

export default CartTable;
