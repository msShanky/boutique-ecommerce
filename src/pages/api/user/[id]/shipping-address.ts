import { definitions } from "@/types/supabase";
import { supabaseServerClient, withApiAuth } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";

const setUserAddress = async (req: NextApiRequest, res: NextApiResponse) => {
	const { id } = req.query;

	const wishlist = await supabaseServerClient({ req, res })
		.from<definitions["user_shipping_address"]>("user_shipping_address")
		.select(`*`)
		.eq("user_id", id as string);
	const { data, ...response } = wishlist;
	res.status(200).json(response);
};

export default withApiAuth(async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") {
		return setUserAddress(req, res);
	}
});
