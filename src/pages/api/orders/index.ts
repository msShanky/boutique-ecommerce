import { supabaseServerClient, withApiAuth } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { definitions } from "types/supabase";

const getAllOrders = async (req: NextApiRequest, res: NextApiResponse) => {
	const userOrders = await supabaseServerClient({ req, res })
		.from<definitions["user_order"]>("user_order")
		.select(`id,created_at,code,status_id,status:status_id (id, status, status_text),shipment_ref,user_id`);
	const { data, ...response } = userOrders;
	res.status(200).json(response);
};

export default withApiAuth(async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") {
		return getAllOrders(req, res);
	}
});


