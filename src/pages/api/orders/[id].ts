import { supabaseServerClient, withApiAuth } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { definitions } from "types/supabase";

const setOrderData = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query
    const orderData = req.body
    const orderStatusChange = await supabaseServerClient({ req, res })
        .from<definitions["user_order"]>("user_order")
        .update(orderData)
        .match({ id })
    const { data, ...response } = orderStatusChange;
    res.status(200).json(response);
};

export default withApiAuth(async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PATCH") {
        return setOrderData(req, res);
    }
});
