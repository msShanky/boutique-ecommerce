import React from "react";
import { Button, Text, Title } from "@mantine/core";
import { IconCheck, IconCurrencyRupee } from "@tabler/icons";
import { cartSafeSelector } from "../../../reducer/cart";
import { useAppSelector } from "../../../app/hooks";
import Link from "next/link";
import { useRouter } from "next/router";

const CartTotal = () => {
	const state = useAppSelector((state) => state);
	const cartTotal = cartSafeSelector(state);

	const router = useRouter();

	const isCheckoutPage = router.route === "/checkout";

	return (
		<section className="flex flex-col items-center w-5/12 space-y-8">
			{/* <Title className="text-xl font-bold text-highlight-dark-blue">Cart Total</Title> */}
			<div className="w-full p-8 space-y-12 bg-violet-light h-72">
				<div className="flex flex-row items-center justify-between border-b-2 border-b-violet-light">
					<Title className="flex items-center space-x-4 text-lg font-semibold">Sub Totals:</Title>
					<Title className="flex items-center space-x-4 text-base">
						<IconCurrencyRupee />
						{cartTotal}
					</Title>
				</div>
				<div className="flex flex-row space-x-4">
					<div className="flex items-center w-8 h-8 rounded-full bg-success">
						<IconCheck width={40} color="white" />
					</div>
					<Text>Shipping &amp; taxes calculated at checkout</Text>
				</div>
				{!isCheckoutPage && (
					<Link href="/checkout" passHref>
						<Button className="w-full bg-success">Proceed To Checkout</Button>
					</Link>
				)}
			</div>
		</section>
	);
};

export default CartTotal;
