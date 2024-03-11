import { ActionIcon, Button, Table, Text } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { getImageUrl } from "helpers/supabase-helper";
import React, { FC } from "react";
import { increaseQuantity, decreaseQuantity, cartTotalSelector } from "reducer/cart";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getSellingPrice } from "../../../helpers/price-calculator";
import { DeleteWarningModal } from "@/components/feature/admin/warning";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import Image from "next/image";
import { handleProductRedirection } from "@/helpers/productHelper";

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

	const anyProductItemHasAddOn = products.some((row) => {
		const flagForAddOn = Object.hasOwn(row, "addOn");
		return flagForAddOn;
	});

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
						<Link href={handleProductRedirection(product) ?? "/"}>
							<Image
								src={baseImage}
								alt={`Product Image ${id}`}
								layout="fixed"
								width={75}
								height={100}
								objectFit="fill"
							/>
						</Link>
						{/* <Image src={baseImage} alt={`Product Image ${id}`} width={100} height={100} fit="contain" /> */}
						{/* TODO: [4] [GoodToHave] A user should be able to change the variant of the product in cart page */}
						<div className="absolute bottom-0 right-0 md:flex md:flex-row">
							<SelectedSize variantText={variant?.size ?? ""} />
						</div>
					</div>
				</td>
				{anyProductItemHasAddOn && (
					<td className="">
						<div className="flex flex-col items-start gap-2 md:flex-row">
							{addOn && <p className="text-xs md:text-base">{addOn?.label}</p>}
							{addOn && (
								<p className="p-0 m-0 text-xs whitespace-nowrap">
									&#40;<span className="text-sm text-green-500 md:text-lg">+ {addOn?.price}</span>&#41;
								</p>
							)}
						</div>
					</td>
				)}
				<td>{sellingPrice}</td>
				<td>
					<Button.Group className="flex items-center">
						<ActionIcon onClick={handleQuantityDecrease} className="h-4 bg-primaryAlt md:h-9">
							<IconMinus size="1.125rem" />
						</ActionIcon>
						<div className="flex items-center justify-center w-8 border md:w-12 h-9">
							<Text className="text-center align-middle ">{quantity}</Text>
						</div>
						<ActionIcon onClick={() => dispatch(increaseQuantity(productState))} className="h-4 md:h-9 bg-primaryAlt">
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
		<section className="flex flex-col w-full gap-4 md:w-7/12">
			<div className="max-h-[60vh] md:max-h-[70vh] overflow-hidden  overflow-y-scroll scrollbar-none px-2">
				<Table verticalSpacing="xs" fontSize="xs" className="mb-40 bg-stone-200 rounded-2xl" withBorder={false}>
					<thead className="w-full table-fixed bg-primary ">
						<tr className="text-left">
							<th className="text-xl font-bold text-primary">Product</th>
							{anyProductItemHasAddOn && <th className="text-xl font-bold text-primary">AddOn</th>}
							<th className="text-xl font-bold text-primary">Price</th>
							<th className="text-xl font-bold text-primary">Quantity</th>
							<th className="text-xl font-bold text-primary">Total</th>
						</tr>
					</thead>
					<tbody className="">{rows}</tbody>
				</Table>
			</div>
			<div className="flex flex-col-reverse items-center w-full gap-2 px-2 bottom-45 md:justify-between md:flex-row">
				<div className="flex w-full md:w-3/12"></div>
				<div className="flex flex-col items-center w-full p-4 md:flex-row md:justify-end bg-primary gap-x-8 gap-y-4 rounded-2xl">
					<div className="flex flex-row items-center gap-2 md:flex-col">
						<p>Total</p>
						<p className="text-xl font-bold">Rs.{cartTotal}</p>
					</div>
					<Link href="/checkout" passHref>
						<Button className="w-40 text-white bg-success active:bg-primary hover:text-primaryBlack active:text-primaryBlack">
							Checkout
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default CartTable;
