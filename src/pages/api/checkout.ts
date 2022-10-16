import type { NextApiRequest, NextApiResponse } from "next";
import { withApiAuth, supabaseServerClient } from "@supabase/auth-helpers-nextjs";
import { nanoid } from "@reduxjs/toolkit";
import Razorpay from "razorpay";

interface ExtendedApiRequest extends NextApiRequest {
	body: CheckoutPostBody;
}

// const instance = new Razorpay({ key_id: "rzp_test_xieC6kdiO45yJN", key_secret: "eAfWqg0glMuqEGJIHcErjnKL" });

// const createRazorPayOrder = () => {
// 	const options = {
// 		amount: 6400,
// 		currency: "INR",
// 		receipt: "order_rcptid_11",
// 	};
// 	instance.orders.create(options, function (err: any, order: any) {
// 		console.log(order);
// 		return order;
// 	});
// };

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
		const orderPostBody = {
			code: nanoid(),
			status_id: 1,
			payment_ref: "",
			shipment_ref: "",
			user_id: body.user_id,
		};
		const shippingAddressBody = {
			user_id: body.user_id,
			...body.shipping_address,
		};

		// console.log(" THE ORDER CREATION FOR THE CHECKOUT IS ", orderPostBody, " \n \n ");
		// console.log(" THE shippingAddressBody ", shippingAddressBody);

		// const orderInfo = createRazorPayOrder();
		// console.log(" The order info ===> ", orderInfo);

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
