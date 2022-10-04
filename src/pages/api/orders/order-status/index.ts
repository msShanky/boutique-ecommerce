import { supabaseServerClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { definitions } from "types/supabase";

const getOrderStatus = async (req: NextApiRequest, res: NextApiResponse) => {
	const userOrders = await supabaseServerClient({ req, res })
		.from<definitions["order_status"]>("order_status")
		.select(`*`);
	const { data, ...response } = userOrders;
	res.status(200).json(response);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") {
		return getOrderStatus(req, res);
	}
}
