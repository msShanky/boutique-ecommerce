import { useGetOrderStatusQuery } from "@/reducer/breezeBaseApi";
import { useState, useEffect } from "react";
import { definitions } from "types/supabase";

interface StatusOptions {
	value: number;
	label: string | undefined;
}

export function useOrderStatus() {
	const orderStatusResponse = useGetOrderStatusQuery();
	const [orderStatusOptions, setOrderStatusOptions] = useState<StatusOptions[]>([]);

	useEffect(() => {
		if (orderStatusResponse?.data?.body) {
			const options = orderStatusResponse.data.body.map((status: definitions["order_status"]) => {
				return {
					value: status.id,
					label: status.status_text,
				};
			});
			setOrderStatusOptions(options);
		}
	}, [orderStatusResponse.data]);

	return orderStatusOptions;
}
