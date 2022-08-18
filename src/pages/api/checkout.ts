import type { NextApiRequest, NextApiResponse } from "next";
import { withApiAuth, supabaseServerClient } from "@supabase/auth-helpers-nextjs";
import { nanoid } from "@reduxjs/toolkit";

interface ExtendedApiRequest extends NextApiRequest {
	body: CheckoutPostBody;
}

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

		try {
			// TODO: Create a new order
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
