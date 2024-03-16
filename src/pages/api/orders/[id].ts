import { supabaseServerClient, withApiAuth } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { definitions } from "types/supabase";

const setOrderData = async (req: NextApiRequest, res: NextApiResponse) => {
	const { id } = req.query;
	const orderData = req.body;
	// IF the id === 2 ACKNOWLEDGE THE ORDER
	// Get the order items related to the order id
	// Validate if the order items are in stock and the order_action flag is false
	// IF id === 6 CANCEL THE ORDER
	try {
		if (orderData.status_id !== 2) {
			const orderStatusChange = await supabaseServerClient({ req, res })
				.from<definitions["user_order"]>("user_order")
				.update(orderData)
				.match({ id });
			const { data, ...response } = orderStatusChange;
			return res.status(200).json(response);
		}

		const { data, error } = await supabaseServerClient({ req, res })
			.from<definitions["order_item"]>("order_item")
			.select("*,variants:product_variant(id,sku,size,inventory_count)")
			.eq("order_id", id);

		if (!data) {
			return res.status(500).json({ error: error.message, message: "The order items could not be retrieved" });
		}

		data.forEach(async (orderDetails) => {
			// @ts-ignore
			const { variant_id, quantity, variants, id } = orderDetails;
			// Check if the quantity is less than the inventory count
			if (quantity && variants.inventory_count > quantity) {
				// Update the inventory count
				await supabaseServerClient({ req, res })
					.from<definitions["product_variant"]>("product_variant")
					.update({ inventory_count: variants.inventory_count - quantity })
					.match({ id: variant_id });
				// Update the order_items -> inventory_action for all the id's
				await supabaseServerClient({ req, res })
					.from<definitions["order_item"]>("order_item")
					.update({ inventory_action: true })
					.match({ id });
			}
		});

		const orderStatusChange = await supabaseServerClient({ req, res })
			.from<definitions["user_order"]>("user_order")
			.update(orderData)
			.match({ id });
		const { data: apiData, ...response } = orderStatusChange;
		res.status(200).json(response);
	} catch (error) {
		// @ts-ignore
		res.status(500).json({ error: error.message ?? "" });
	}
};

export default withApiAuth(async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "PATCH") {
		return setOrderData(req, res);
	}
});
