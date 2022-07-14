import { Image, Title } from "@mantine/core";
import type { NextPage } from "next";
import Head from "next/head";
import { useAppSelector } from "../app/hooks";
import CartTotal from "../components/feature/cart/CartTotal";
import CheckoutForm from "../components/feature/checkout/CheckoutForm";
import AppLayout from "../components/layout/AppLayout";

const Checkout: NextPage = () => {
	const cartState = useAppSelector((state) => state.cart);

	return (
		<AppLayout>
			<>
				<Head>
					<title>Breeze Boutique | Checkout</title>
				</Head>
				<section className="flex w-full h-72 bg-violet-light">
					<div className="container flex flex-col justify-center mx-auto">
						<Title>Checkout</Title>
					</div>
				</section>
				<section className="container flex flex-wrap justify-center gap-10 mx-auto mt-20">
					{cartState.products.length === 0 && (
						<div className="flex flex-col items-center justify-center select-none">
							<Image src="/images/404.svg" alt="No Orders Found" />
							<Title className="text-4xl font-thin text-violet">The Cart Is Empty</Title>
						</div>
					)}
					{cartState.products.length > 0 && (
						<div className="flex flex-row items-start justify-center w-full gap-10">
							<CheckoutForm />
							<CartTotal />
						</div>
					)}
				</section>
			</>
		</AppLayout>
	);
};

export default Checkout;
