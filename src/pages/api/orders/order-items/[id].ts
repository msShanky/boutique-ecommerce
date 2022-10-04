import { supabaseServerClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { definitions } from "types/supabase";

const getOrderItemsById = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query
    const orderItems = await supabaseServerClient({ req, res })
        .from<definitions["order_item"]>("order_item")
        .select(`
        id,
        order_id,
        product_variant:variant_id(id, sku, size, product_id, inventory_count),
        product:product_id(id, title, code, images, category_id, category: category_id(id, category)),
        price,
        discount,
        quantity`)
        .eq('order_id', id as string)
    const { data, ...response } = orderItems;
    res.status(200).json(response);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        return getOrderItemsById(req, res);
    }
}
