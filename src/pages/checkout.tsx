import { Image, Title } from "@mantine/core";
import type { NextPage } from "next";
import Head from "next/head";
import { useAppSelector } from "../app/hooks";
import CartTotal from "../components/feature/cart/CartTotal";
import CheckoutForm from "../components/feature/checkout/CheckoutForm";
import { AppSection, AppLayout } from "@/components/layout";

import { useCheckoutProductMutation } from "reducer/breezeBaseApi";
import { useUser } from "@supabase/auth-helpers-react";

const Checkout: NextPage = () => {
	const { products } = useAppSelector((state) => state.cart);
	const { user } = useUser();
	const [checkoutCart, { isLoading, data, isSuccess }] = useCheckoutProductMutation();

	console.log("THE DATA FETCHED AFTER CREATION OF ALL RESOURCES", data, isSuccess);

	const handleCheckout = (formValues: CheckoutFormValue) => {
		console.log(formValues, "FORM SUBMITTED ");
		console.log(products, "Products in cart");
		checkoutCart({ products, shipping_address: formValues, user_id: user?.id });
	};

	return (
		<AppLayout>
			<>
				<Head>
					<title>Breeze Boutique | Checkout</title>
				</Head>
				<AppSection>
					<>
						{products.length === 0 && (
							<div className="flex flex-col items-center justify-center select-none">
								<Image src="/images/404.svg" alt="No Orders Found" />
								<Title className="text-4xl font-thin text-violet">The Cart Is Empty</Title>
							</div>
						)}
						{products.length > 0 && !isSuccess && (
							<div className="flex flex-row items-start justify-center w-full gap-10 relative">
								<CheckoutForm handleCheckout={handleCheckout} isLoading={isLoading} user={user} />
								<CartTotal />
							</div>
						)}
						{isSuccess && <div>Order created !! {data && data?.order?.code} </div>}
					</>
				</AppSection>
			</>
		</AppLayout>
	);
};

export default Checkout;
