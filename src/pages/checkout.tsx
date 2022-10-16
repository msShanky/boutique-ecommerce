import { Button, Image, Text, Title } from "@mantine/core";
import type { NextPage } from "next";
import Head from "next/head";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import CartTotal from "../components/feature/cart/CartTotal";
import CheckoutForm from "../components/feature/checkout/CheckoutForm";
import { AppSection, AppLayout } from "@/components/layout";

import { useCheckoutProductMutation } from "reducer/breezeBaseApi";
import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useEffect } from "react";
import { clearCart } from "reducer/cart";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";

const Checkout: NextPage = () => {
	const { products } = useAppSelector((state) => state.cart);
	const dispatch = useAppDispatch();
	const { user } = useUser();
	const [checkoutCart, { isLoading, isSuccess }] = useCheckoutProductMutation();

	const handleCheckout = (formValues: CheckoutFormValue) => {
		checkoutCart({ products, shipping_address: formValues, user_id: user?.id });
	};

	useEffect(() => {
		if (isSuccess) {
			setTimeout(() => {
				dispatch(clearCart());
			}, 450);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccess]);

	return (
		<AppLayout>
			<>
				<Head>
					<title>Breeze Boutique | Checkout</title>
				</Head>
				<AppSection>
					<>
						{products.length === 0 && !isSuccess && (
							<div className="flex flex-col items-center justify-center select-none">
								<Image height={450} src="/images/404.svg" alt="No Orders Found" />
								<Title className="text-4xl font-thin text-violet">The Cart Is Empty</Title>
								<Link href="/products">
									<Text className="mt-8 hover:cursor-pointer hover:text-pink text=black underline">View Products</Text>
								</Link>
							</div>
						)}
						{products.length > 0 && !isSuccess && (
							<div className="relative flex flex-row items-start justify-center w-full gap-10">
								<CheckoutForm handleCheckout={handleCheckout} isLoading={isLoading} user={user} />
								<CartTotal />
							</div>
						)}
						{isSuccess && (
							<div className="flex flex-col items-center justify-center w-3/5 space-y-8 text-center select-none">
								<Image fit="contain" src="/images/success_icon.svg" alt="Cart Success Icon" />
								<Title className="text-4xl font-bold text-page">Your Order Is Completed!</Title>
								<Text className="text-base font-semibold text-violet-subtext">
									Thank you for your order! Your order is being processed and will be completed within 3-6 hours. You
									will receive an email confirmation when your order is completed.
								</Text>
								<Link href="/products" passHref>
									<Button className="text-white border-none bg-pink hover:bg-violet">Continue Shopping</Button>
								</Link>
							</div>
						)}
					</>
				</AppSection>
			</>
		</AppLayout>
	);
};

export default Checkout;

export const getServerSideProps = withPageAuth({ redirectTo: "/login?referrer=checkout" });
