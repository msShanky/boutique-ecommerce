import { Button, Image, Text, Title } from "@mantine/core";
import type { NextPage } from "next";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import CartTotal from "../components/feature/cart/CartTotal";
import CheckoutForm from "../components/feature/checkout/CheckoutForm";
import { AppSection, AppLayout } from "@/components/layout";
import { useCheckoutProductMutation, useInitiatePaymentMutation } from "reducer/breezeBaseApi";
import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import useRazorpay from "react-razorpay";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { cartTotalSelector, clearCart } from "@/reducer/cart";
import { useEffect, useState } from "react";
import { useLottie } from "lottie-react";

import orderPlacedAnimation from "animations/72243-order-placed.json";

const orderPlacedAnimationProps = {
	animationData: orderPlacedAnimation,
	loop: true,
	style: {
		width: "350px",
		height: "350px",
	},
};

const Checkout: NextPage = () => {
	const { products } = useAppSelector((state) => state.cart);
	const state = useAppSelector((state) => state);
	const dispatch = useAppDispatch();
	const cartTotal = cartTotalSelector(state);

	const { View } = useLottie(orderPlacedAnimationProps);

	const { user } = useUser();
	const [checkoutCart, { isLoading, isSuccess }] = useCheckoutProductMutation();
	const [initiatePayment, paymentOrderState] = useInitiatePaymentMutation();
	const { data: paymentOrder, isSuccess: paymentOrderSuccess, isLoading: isPaymentLoading } = paymentOrderState;

	useEffect(() => {
		if (isSuccess) {
			setTimeout(() => {
				dispatch(clearCart());
			}, 450);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccess]);

	const RazorPay = useRazorpay();

	const handlePaymentSuccess = (res: RazorPaySuccess, formValues: CheckoutFormValue) => {
		checkoutCart({
			products,
			shipping_address: formValues,
			user_id: user?.id,
			payment: res,
		});
	};

	const handlePayment = async (orderInformation: RazorpayOrderResponse, formValues: CheckoutFormValue) => {
		const options = {
			key: process.env.NEXT_RAZOR_ID ?? "",
			amount: `${cartTotal}00`,
			currency: "INR",
			name: "Breeze Boutique",
			order_id: orderInformation.id,
			handler: (res: RazorPaySuccess) => handlePaymentSuccess(res, formValues),
			prefill: {
				name: formValues.first_name + formValues.last_name,
				email: user?.email,
				contact: formValues.phone_number,
			},
			notes: {
				address: "xxxxxxxx",
			},
			theme: {
				color: "#3399cc",
			},
		};

		const rzpay = new RazorPay(options);
		rzpay.on("payment.failed", function (response: RazorPayError) {
			console.log(" The error from RazorPay ===> ", response);
		});
		rzpay.open();
	};

	const handleCheckout = (formValues: CheckoutFormValue) => {
		initiatePayment({ products, shipping_address: formValues, user_id: user?.id })
			.unwrap()
			.then((res: RazorpayOrderResponse) => {
				if (!res) return;
				handlePayment(res, formValues);
			});
	};

	return (
		<AppLayout pageTitle="Breeze Boutique | Checkout">
			<>
				<AppSection>
					<>
						{products.length === 0 && !isSuccess && (
							<div className="flex flex-col items-center justify-center w-11/12 select-none">
								<Image height={450} src="/images/404.svg" alt="No Orders Found" />
								<Title className="text-4xl font-thin text-primaryBlack">The Cart Is Empty</Title>
								<Link href="/">
									<Text className="mt-8 text-black underline hover:cursor-pointer hover:text-primary">
										View Products
									</Text>
								</Link>
							</div>
						)}
						{products.length > 0 && !isSuccess && (
							<div className="relative flex flex-col items-start justify-center w-full gap-10 p-4 md:flex-row">
								<CheckoutForm handleCheckout={handleCheckout} isLoading={isLoading || isPaymentLoading} user={user} />
								<CartTotal />
							</div>
						)}
						{isSuccess && paymentOrderSuccess && (
							<div className="flex flex-col items-center justify-center w-10/12 gap-4 text-center select-none md:w-3/5">
								{/* <Image width={350} src="/images/success_icon.svg" alt="Cart Success Icon" /> */}
								<div>{View}</div>
								<Title className="mt-0 text-4xl font-bold text-primary">Your Order Is Completed!</Title>
								<Text className="text-base font-semibold text-violet-subtext">
									Thank you for your order! Your order is being processed and will be completed within 3-6 hours. You
									will receive an email confirmation when your order is completed.
								</Text>
								<Link href="/" passHref>
									<Button className="text-white border-none bg-primaryBlack hover:bg-primary hover:text-primaryBlack">
										Continue Shopping
									</Button>
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
