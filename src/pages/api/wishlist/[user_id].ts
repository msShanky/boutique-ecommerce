import { supabaseServerClient, withApiAuth } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { definitions } from "types/supabase";

const getUserWishlist = async (req: NextApiRequest, res: NextApiResponse) => {
    const { user_id } = req.query
    const wishlist = await supabaseServerClient({ req, res })
        .from<definitions["user_wishlist"]>("user_wishlist")
        .select(`id,user_id,product_id,product(id,code,images,category_id,msrp,title,sub_title,product_discount,
        category:category_id (id,category),
        variants:product_variant(id,sku,size))`)
        .match({ user_id });
    const { data, ...response } = wishlist;
    res.status(200).json(response);
};

export default withApiAuth(async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        return getUserWishlist(req, res);
    }
});
