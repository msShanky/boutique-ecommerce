import { supabaseServerClient, withApiAuth } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { definitions } from "types/supabase";

type UserOrder = definitions["user_order"];

const getAllOrders = async (req: NextApiRequest, res: NextApiResponse) => {
	const { from, to, ...filters } = req.query;
	let supabaseQuery = supabaseServerClient({ req, res })
		.from<UserOrder>("user_order")
		.select(`id,created_at,code,status_id,status:status_id (id, status, status_text),shipment_ref,user_id`, {
			count: "exact",
		})
		.order("created_at", { ascending: false });
	const rangeFrom = parseInt(from as string);
	const rangeTo = parseInt(to as string);
	if (filters && Object.keys(filters).length) supabaseQuery = supabaseQuery.match(filters);
	if (typeof rangeFrom === "number" && typeof rangeTo === "number")
		supabaseQuery = supabaseQuery.range(rangeFrom, rangeTo);
	const userOrders = await supabaseQuery;
	const { data, ...response } = userOrders;
	res.status(200).json(response);
};

export default withApiAuth(async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") {
		return getAllOrders(req, res);
	}
});
