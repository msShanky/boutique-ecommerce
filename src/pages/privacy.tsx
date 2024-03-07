import { AppLayout, AppSection } from "@/components/layout";
import Link from "next/link";
import React from "react";

const PrivacyPolicyPage = () => {
	return (
		<AppLayout isContained pageTitle="Privacy Policy & Disclaimer">
			<article className="container p-6 prose-sm prose 2xl:prose-sm md:p-0">
				<h1 className="text-primary">You&#39;re Privacy</h1>
				<p>
					We regard your right to security. Our protection and security strategy traces the data we gather about you,
					how and why we utilize the data, and a few alternatives you need to confine for our utilization of this
					information.
				</p>
				<h3 className="text-sm text-primary">Our Email List</h3>
				<p>
					We offer new collection dispatches and other Breeze Boutique (A unit of MM enterprises) news ahead of time of
					deals to the people who pursue our email list notification. Email addresses collected at &nbsp;
					<Link href="/">www.breezeboutique.in</Link> &nbsp;are just for internal uses. We regard your privacy rights
					and won&#39;t sell or lease your email address to different organizations. While pursuing our mailers, your
					versatile number is discretionary, yet your email address is required. On the off chance that you might want
					to withdraw from our email list, kindly reach us or utilize the unsubscribe tab in the messages we send you.
					We will eliminate your name from our email list straightaway. Kindly perceive that you might get one more
					email before we can remove you from the mailing list.
				</p>
				<p>
					Moreover, in specific situations, <Link href="/">www.breezeboutique.in</Link> might be needed to uncover your
					recognizable data when the law requires it, or because of any interest by law authorization experts regarding
					a criminal examination, or general or managerial experts regarding a forthcoming prevailing case or
					authoritative analysis.
				</p>
				<h3 className="text-primary">Online Orders</h3>
				<p>
					While shopping on our online store, in regards to the situation with your request, we require the data
					important for us to complete your request, or to get in touch with you. The data we gather incorporates your
					name, mobile number, email address, dispatching address and payment address.
				</p>
				<h3 className="text-primary">Security</h3>
				<p>
					Breeze Boutique (A unit of MM enterprises) doesn&#39;t store your Mastercard or online financial balance data.
					These details are visibly attributed in the secure bank instalment channels by you.
				</p>
				<h3 className="text-primary">Strategy Changes</h3>
				<p>
					Breeze Boutique (A unit of MM enterprises) may occasionally refresh this Privacy and Security Policy for new,
					unforeseen utilizations not recently uncovered. Any progressions caused will be posted here. By visiting our
					site, you consent to acknowledge any advancements made to this approach. Breeze Boutique (A unit of MM
					enterprises) Privacy and Security Policy aptly address the utilization and exposure of data we gather from you
					through our site.
				</p>
				<p>Go ahead and reach us with any inquiries concerning our Privacy and Security Policy.</p>
				<h1 className="text-primary">Disclaimer</h1>
				<h3 className="text-primary">Disclaimer Of Warranties And Limitation Of Liability</h3>
				<p>
					This site and all the products, data, materials and so forth accessible on this site is given on &#39;with no
					guarantees&#39; and &#39;as accessible&#39; premise, except if in any case indicated as a hard copy. The
					supplier makes no portrayals or guarantees of any sort, express or inferred, concerning the activity of this
					site or the substance, data, materials, and so forth made accessible to you through this site, except if in
					any case indicated recorded as a hard copy. You explicitly concur that your utilization of this site is at
					your risk.
				</p>
				<p>
					As allowed by law, we deny all guarantees as suppliers, express or suggested, including, yet not restricted to
					inferred guarantees of selling and qualification for a specific purpose. We additionally don&#39;t warrant
					that this site and all the products, data, materials, and so forth accessible on this site, or through our
					workers, or email sent from us are free from viruses or other malicious software.
				</p>
				<p>
					We don&#39;t commit to any damage of any sort emerging from the utilization of this site or any substance,
					data, materials accessible on this site, including, however, not restricted to an immediate, circuitous,
					accidental, reformatory, and heavy damages.
				</p>
			</article>
		</AppLayout>
	);
};

export default PrivacyPolicyPage;
