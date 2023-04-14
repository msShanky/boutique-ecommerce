import { AppLayout } from "@/components/layout";
import { Divider } from "@mantine/core";

import React from "react";

const PrivacyPolicyPage = () => {
	return (
		<AppLayout isContained pageTitle="Shipping & Delivery Policy">
			<article className="container p-6 prose-sm prose 2xl:prose-sm md:p-0">
				<h1 className="text-primary">Last updated on Apr 14th 2023</h1>
				<h3 className="">Available Payment Methods For Orders:</h3>
				<p className="">
					For International buyers, orders are shipped and delivered through registered international courier companies
					and/or International speed post only. For domestic buyers, orders are shipped through registered domestic
					courier companies and /or speed post only. Orders are shipped within 3-5 days or as per the delivery date
					agreed at the time of order confirmation and delivering of the shipment subject to Courier Company / post
					office norms. MM ENTERPRISES is not liable for any delay in delivery by the courier company / postal
					authorities and only guarantees to hand over the consignment to the courier company or postal authorities
					within 3-5 days from the date of the order and payment or as per the delivery date agreed at the time of order
					confirmation. Delivery of all orders will be to the address provided by the buyer. Delivery of our services
					will be confirmed on your mail ID as specified during registration. For any issues in utilizing our services
					you may contact our helpdesk on
				</p>
				<div className="flex flex-wrap gap-2">
					<a className="px-2 font-semibold text-primaryBlack" href="tel:+917358489990">
						+91 7358489990
					</a>
					<Divider orientation="vertical" />
					<a href="mailto:r.vasanthikumaresan@gmail.com" className="px-2">
						r.vasanthikumaresan@gmail.com
					</a>
				</div>
			</article>
		</AppLayout>
	);
};

export default PrivacyPolicyPage;
