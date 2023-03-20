import type { NextApiRequest, NextApiResponse } from "next";
import { withApiAuth, supabaseServerClient } from "@supabase/auth-helpers-nextjs";
import { nanoid } from "@reduxjs/toolkit";
import Razorpay from "razorpay";
import { definitions } from "types/supabase";

interface ExtendedApiRequest extends NextApiRequest {
	body: CheckoutPostBody;
}

const instance = new Razorpay({
	key_id: process.env.NEXT_RAZOR_ID ?? "rzp_test_xieC6kdiO45yJN",
	key_secret: process.env.NEXT_RAZOR_VALUE ?? "eAfWqg0glMuqEGJIHcErjnKL",
});

const getCartTotalPrice = (products: Array<CartProduct>) => {
	let totalValue = 0;
	products.forEach((stateValue) => {
		const { product, quantity } = stateValue;
		const mrp = product.msrp as number;
		const discountPrice = mrp * ((product.product_discount as number) / 100);
		const productPrice = mrp - parseInt(discountPrice?.toFixed(), 10);
		const productTotalPrice = quantity * productPrice;
		totalValue = productTotalPrice + totalValue;
	});
	console.log(" TOTAL VALUE TO BE PAID IS ===> ", totalValue);
	return totalValue;
};

const generateOrderItemsBody = (orderId: number, cartProduct: CartProduct) => {
	const { product, variant, quantity } = cartProduct;
	return {
		order_id: orderId,
		product_id: product.id,
		variant_id: variant.id,
		price: product.msrp,
		discount: product.product_discount,
		quantity: quantity,
	};
};

export default withApiAuth(async function ProtectedRoute(req: ExtendedApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		const body = req.body;
		const orderPostBody: Partial<definitions["user_order"]> = {
			code: nanoid(),
			status_id: 1,
			shipment_ref: "",
			user_id: body.user_id,
			...body.payment,
		};
		const shippingAddressBody = {
			user_id: body.user_id,
			...body.shipping_address,
		};

		// console.log(" THE ORDER CREATION FOR THE CHECKOUT IS ", orderPostBody, " \n \n ");
		// console.log(" THE shippingAddressBody ", shippingAddressBody);

		try {
			const { data: order, error } = await supabaseServerClient({ req, res }).from("user_order").insert(orderPostBody);
			if (!order || order?.length <= 0 || error) {
				return res.status(500).json({ message: "Order was not created", error });
			}
			const { data: shipping_address } = await supabaseServerClient({ req, res })
				.from("user_shipping_address")
				.insert([shippingAddressBody]);
			const orderItemsBody = body.products.map((product) => generateOrderItemsBody(order[0].id, product));
			const { data: order_items } = await supabaseServerClient({ req, res }).from("order_item").insert(orderItemsBody);
			return res.status(201).json({
				message: "new order created",
				data: {
					order: order[0],
					shipping_address,
					order_items,
				},
			});
		} catch (error) {
			return res.status(500).json({ message: "Error creating checkout" });
		}
	}
});
