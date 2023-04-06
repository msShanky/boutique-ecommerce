import { AppLayout, AppSection } from "@/components/layout";
import Link from "next/link";
import React from "react";

const PrivacyPolicyPage = () => {
	return (
		<AppLayout isContained pageTitle="Returns & Exchanges">
			<article className="container p-6 prose-sm prose md:p-0 2xl:prose-sm">
				<h1 className="text-primary">Returns &amp; Size Exchange</h1>
				<h3 className="text-primary">Returns</h3>
				<ol>
					<li>We take returns only in the following cases:</li>
					<ul>
						<li>Item is Defective (Please attach relevant pictures in reply)</li>
						<li>The wrong size was Delivered (Other than the one that has been requested)</li>
					</ul>
					<li>
						Please make all valid return requests within 7 working days of receiving the product by emailing us at
						care@breezeboutique.in
					</li>
					<li>The item should be in its original, unworn, unused, unwashed, and undamaged condition</li>
					<li>Valid returns will be issued in the form of store credits only</li>
					<li>
						We do not have a return pickup facility hence the packet has to be sent back by the Customer to our address
					</li>
					<li>
						Minor damages like tassels being pulled off etc. might happen during transit are not covered under return /
						exchange policy
					</li>
					<li>
						There might be a minor (10%-12%) colour difference between the actual product and the pictures shown due to
						screen resolution issues. Please do not ask for exchange on this ground
					</li>
					<li>
						Products on Sale / Discounts or purchased using any sorts of Coupon Codes will not be eligible for Size
						Exchange & Returns
					</li>
					<li>International Orders will not be eligible for Size Exchange & Returns</li>
				</ol>
				<h3 className="text-sm text-primary">Size Exchange:</h3>
				<p>We hope you get correct fits & love our products always, and never need to come to this page.</p>
				<p>We also provide a margin of 3-4 inches in every outfit.</p>
				<p>But in an extremely rare case that you do, here is our Size Exchange policy:</p>
				<ol>
					<li>In case another size is required than the one ordered for the same product:</li>
					<ul>
						<li>
							Please send back the dress to us on the below mentioned address, we do not have reverse pickup facility
						</li>
					</ul>
					<li>Do insert a slip inside the packet mentioning your contact details and the required size.</li>
					<li>
						A new dress will be delivered in 2-4 working days after we receive and the returned dress passes the quality
						check
					</li>
					<li>
						The dress returned would be exchanged with the same dress of different size (subject to the availability in
						stock)
					</li>
					<li>Second time Courier charges Rs. 90/- per half kg would be charged for sending back the dress</li>
				</ol>
				<h6 className="font-bold">
					Return Address: 31, 1st Main Rd, Phase-2, Thirumalai Nagar Annexe, Perungudi, Chennai, Tamil Nadu 600096
				</h6>
				<h6 className="font-bold">Contact: +91 73584 89990</h6>
				<p className="text-primaryBlack font-extralight">For any other queries or issues you can Contact us.</p>
				<p className="text-primaryBlack font-extralight">Don&#39;t worry, we are pretty accommodating!</p>
				<p className="text-xl font-bold text-primaryBlack">
					All valid returns would be assigned in form of Store Credit only.
				</p>
			</article>
		</AppLayout>
	);
};

export default PrivacyPolicyPage;
