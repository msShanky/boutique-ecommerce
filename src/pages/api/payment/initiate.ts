import Razorpay from "razorpay";
import type { NextApiRequest, NextApiResponse } from "next";
import { withApiAuth } from "@supabase/auth-helpers-nextjs";
import { nanoid } from "nanoid";
const instance = new Razorpay({ key_id: "rzp_test_xieC6kdiO45yJN", key_secret: "eAfWqg0glMuqEGJIHcErjnKL" });

interface ExtendedApiRequest extends NextApiRequest {
	body: CheckoutPostBody;
}

const getCartTotalPrice = (products: Array<CartProduct>) => {
	let totalValue = 0;
	products.forEach((stateValue) => {
		const { product, quantity } = stateValue;
		const mrp = product.msrp as number;
		const discountPrice = mrp * ((product.product_discount as number) / 100);
		const productPrice = mrp - parseInt(discountPrice?.toFixed(), 10);
		const productTotalPrice = quantity * productPrice;
		totalValue = productTotalPrice + totalValue;
	});
	console.log(" TOTAL VALUE TO BE PAID IS ===> ", totalValue);
	return totalValue;
};

// TODO: Form the correct post body to accept the payment as per the selling price of the item and quantity
const createRazorPayOrder = async (refId: string, products: Array<CartProduct>) => {
	const options = {
		amount: `${getCartTotalPrice(products)}00`,
		currency: "INR",
		// TODO: This has to be a reference to the current order_id generated
		receipt: refId,
	};
	return await instance.orders.create(options);
};

export default withApiAuth(async function ProtectedRoute(req: ExtendedApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		const body = req.body;
		const ref_code = nanoid();
		try {
			const orderInfo = await createRazorPayOrder(ref_code, body.products);
			return res.status(201).json(orderInfo);
		} catch (error) {
			return res.status(500).json({ message: "Error initiating payment" });
		}
	}
});
