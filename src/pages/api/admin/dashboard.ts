import { supabaseServerClient, withApiAuth } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";

const getDashboardData = async (req: NextApiRequest, res: NextApiResponse) => {
	// TODO: Daily order count for each month
	let { data: average_order_value } = await supabaseServerClient({ req, res }).from("average_order_value").select("*");
	let { data: average_time_between_orders } = await supabaseServerClient({ req, res })
		.from("average_time_between_orders")
		.select("*");
	let { data: daily_orders } = await supabaseServerClient({ req, res }).from("daily_orders").select("*");
	let { data: monthly_orders } = await supabaseServerClient({ req, res }).from("monthly_orders").select("*");
	let { data: order_status_count } = await supabaseServerClient({ req, res })
		.from("order_status_count")
		.select("*,order_status (*)");
	// let { data: top_10_products } = await supabaseServerClient({ req, res }).from("top_10_products").select("*,product (*)");
	let { data: variant_count_by_size } = await supabaseServerClient({ req, res })
		.from("variant_count_by_size")
		.select("*");
	let { data: sold_aggregation } = await supabaseServerClient({ req, res })
		.from("total_sold_quantity_and_price")
		.select("*,product (*)");

	let { data: total_order_price } = await supabaseServerClient({ req, res }).from("total_order_price").select("*");


	// TODO: Monthly order count for each year
	// TODO: Group by order status
	// TODO: Group by variant size
	// TODO: Total sales

	return {
		averageOrderValue: average_order_value ? average_order_value[0].average_order_value : 0,
		totalOrderPrice: total_order_price ? total_order_price[0].total_order_item_price : 0,
		averageTimeBetweenOrders: average_time_between_orders
			? average_time_between_orders[0].average_time_between_orders
			: 0,
		dailyOrders: daily_orders,
		monthlyOrders: monthly_orders,
		orderStatusCount: order_status_count,
		// topTenProducts: top_10_products,
		variantCountBySize: variant_count_by_size,
		soldAggregation: sold_aggregation,
	};
};

export default withApiAuth(async function handler(req: NextApiRequest, res: NextApiResponse) {
	// const user = await getUser(req, res);
	try {
		const { data: user, error } = await supabaseServerClient({ req, res }).auth.api.getUserByCookie(req);
		const dbUser = await supabaseServerClient({ req, res }).from("profiles").select(`*`).eq("id", user?.id);

		if (!dbUser || (dbUser.data && dbUser.data[0].is_admin === false) || error) {
			return res.status(401).json({ error: "not_authorized", message: "You are not authorized" });
		}

		if (req.method === "GET") {
			const responseDB = await getDashboardData(req, res);
			return res.status(200).json({ ...responseDB });
		}
		return res.status(404).json({ error: "The route is not available" });
	} catch (error) {
		throw error;
	}
});
