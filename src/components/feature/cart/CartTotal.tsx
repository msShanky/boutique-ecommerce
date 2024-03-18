import React from "react";
import { Button, Divider, Text, Title } from "@mantine/core";
import { IconCheck, IconCurrencyRupee } from "@tabler/icons";
import { cartTotalSelector } from "../../../reducer/cart";
import { useAppSelector } from "../../../app/hooks";
import Link from "next/link";
import { useRouter } from "next/router";

const CartTotal = () => {
	const state = useAppSelector((state) => state);
	const cartTotal = cartTotalSelector(state);

	const router = useRouter();

	const isCheckoutPage = router.route === "/checkout";

	const gstAmount = cartTotal * 0.12;

	return (
		<section className="flex flex-col items-center w-full space-y-8 lg:w-4/12">
			<div className="flex flex-col w-full p-8 rounded-lg gap-y-2 bg-primaryAlt/20 h-72">
				<div className="flex flex-row items-center justify-between">
					<Title className="flex items-center space-x-4 text-lg font-semibold">Cart Value:</Title>
					<Title className="flex items-center space-x-4 text-base">
						<IconCurrencyRupee className="w-4 h-4" />
						{(cartTotal - gstAmount).toFixed(2)}
					</Title>
				</div>
				<div className="flex flex-row items-center justify-between">
					<Title className="flex items-center space-x-4 text-lg font-semibold">Total GST:</Title>
					<Title className="flex items-center space-x-4 text-base">
						<IconCurrencyRupee className="w-4 h-4" />
						{gstAmount.toFixed(2)}
					</Title>
				</div>
				<div className="flex flex-row items-center justify-between">
					<div className="flex flex-col">
						<Title className="flex items-center space-x-4 text-lg font-semibold">Delivery:</Title>
						<Title className="flex items-center text-xs font-semibold">Delivery free within India</Title>
					</div>
					<Title className="flex items-center space-x-4 text-base">
						<IconCurrencyRupee className="w-4 h-4" />
						{"0.00"}
					</Title>
				</div>
				<div className="flex flex-row items-center justify-between">
					<Title className="flex items-center space-x-4 text-lg font-semibold">Cart Total:</Title>
					<Title className="flex items-center space-x-4 text-base">
						<IconCurrencyRupee className="w-4 h-4" />
						{cartTotal.toFixed(2)}
					</Title>
				</div>
				<Divider />
				<div className="flex flex-row space-x-4">
					<div className="flex items-center w-8 h-8 rounded-full bg-success">
						<IconCheck width={40} color="white" />
					</div>
					<Text>All products include 12% GST</Text>
				</div>
				{!isCheckoutPage && (
					<Link href="/checkout" passHref>
						<Button className="w-full text-white bg-success active:bg-primary hover:text-primaryBlack active:text-primaryBlack">
							Proceed To Checkout
						</Button>
					</Link>
				)}
			</div>
		</section>
	);
};

export default CartTotal;
