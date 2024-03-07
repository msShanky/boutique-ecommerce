import { AppLayout, AppSection } from "@/components/layout";
import Link from "next/link";
import React from "react";

const PaymentMethodPage = () => {
	return (
		<AppLayout isContained pageTitle="Payment Methods & Orders">
			<article className="container p-6 prose-sm prose 2xl:prose-sm md:p-0">
				<h1 className="text-primary">Payment Methods- Orders</h1>
				<h3 className="">Available Payment Methods For Orders:</h3>
				<h4 className="">customers can make payments using the following at the checkout:</h4>
				<h2 className="py-6 font-bold text-primaryBlack">Razorpay</h2>
				<ol>
					<li>Select the desired payment option inside Razorpay (UPI, Cards, Wallets, Net Banking) at the checkout.</li>
					<li>You can use this option to pay using your Credit/Debit Card</li>
					<li>Kindly note that the Checkout will be done in INR only</li>
				</ol>
			</article>
		</AppLayout>
	);
};

export default PaymentMethodPage;
