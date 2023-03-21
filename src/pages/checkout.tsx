import { Button, Image, Text, Title } from "@mantine/core";
import type { NextPage } from "next";
import Head from "next/head";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import CartTotal from "../components/feature/cart/CartTotal";
import CheckoutForm from "../components/feature/checkout/CheckoutForm";
import { AppSection, AppLayout } from "@/components/layout";
import { useCheckoutProductMutation, useInitiatePaymentMutation } from "reducer/breezeBaseApi";
import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import useRazorpay from "react-razorpay";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { cartSafeSelector, clearCart } from "@/reducer/cart";
import { useEffect, useState } from "react";

const Checkout: NextPage = () => {
	const { products } = useAppSelector((state) => state.cart);
	const state = useAppSelector((state) => state);
	const dispatch = useAppDispatch();
	const cartTotal = cartSafeSelector(state);

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
			key: "rzp_test_xieC6kdiO45yJN",
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
								<CheckoutForm handleCheckout={handleCheckout} isLoading={isLoading || isPaymentLoading} user={user} />
								<CartTotal />
							</div>
						)}
						{isSuccess && (
							<div className="flex flex-col items-center justify-center w-3/5 space-y-8 text-center select-none">
								<Image width={350} src="/images/success_icon.svg" alt="Cart Success Icon" />
								<Title className="text-4xl font-bold text-primary">Your Order Is Completed!</Title>
								<Text className="text-base font-semibold text-violet-subtext">
									Thank you for your order! Your order is being processed and will be completed within 3-6 hours. You
									will receive an email confirmation when your order is completed.
								</Text>
								<Link href="/" passHref>
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
