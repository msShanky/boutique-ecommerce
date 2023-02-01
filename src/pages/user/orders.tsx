import { ReactElement, useEffect, useState } from "react";
import { supabaseClient, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { AppLayout } from "@/components/layout";
import { useUser } from "@supabase/auth-helpers-react";
import { Image, Text, Title } from "@mantine/core";
import dayjs from "dayjs";

const getFormattedStatus = (status: string): string => {
	const splitText = status.replace("_", " ").split(" ");
	const formattedText = splitText.map((text) => text.charAt(0).toUpperCase() + text.slice(1)).join(" ");
	return formattedText;
};

const OrdersPage = () => {
	const { user } = useUser();
	const [userOrders, setUserOrders] = useState<Array<UserOrderWithRelations> | undefined>();

	// TODO: [2] Orders should be sorted by time of creation or update
	const fetchUserOrders = async () => {
		const { data, error } = await supabaseClient
			.from("user_order")
			.select(`*, order_item(*, product(*), product_variant(*)), order_status(*)`);
		if (!error) {
			setUserOrders(data);
		}
	};

	useEffect(() => {
		if (user) fetchUserOrders();
	}, [user]);

	const OrderItemCard = ({ item }: { item: OrderItemWithRelations }): ReactElement | null => {
		if (!item.product) return null;
		const { product_variant, product, quantity } = item;
		return (
			<div className="flex flex-row space-x-10">
				<Image height={130} width={100} alt="product" radius={"md"} src={(product?.images?.[0] as string) || ""} />
				<div className="space-y-2">
					<Title className="text-2xl text-primary">{item.product.title}</Title>
					<Text>{item.product.sub_title}</Text>
					<Text>Size: {product_variant.size}</Text>
					<Text>Quantity: {quantity}</Text>
				</div>
			</div>
		);
	};

	return (
		<AppLayout menuLinks={[]}>
			<section className="container flex flex-wrap flex-col gap-10 mx-auto my-20 2xl:min-h-[550px]">
				<h1>User Orders</h1>
				<>
					{userOrders &&
						userOrders.map((order, index) => {
							const { order_item, code, order_status, created_at } = order;
							return (
								<div
									key={`order_item_container_${(index + 9) * 50}`}
									className="flex flex-col self-center w-4/6 p-4 space-y-4 rounded-md shadow-md bg-violet-light min-h-40"
								>
									<div className="flex flex-row items-baseline space-x-4">
										<Title className="text-xl text-primary">{getFormattedStatus(order_status.status as string)}</Title>
										<Text>{dayjs(created_at).format(`YYYY-MM-DD`)}</Text>
									</div>
									<div className="py-4 select-none">
										{order_item.map((item) => (
											<OrderItemCard key={`order_item_${item.id}`} item={item} />
										))}
									</div>
								</div>
							);
						})}
				</>
			</section>
		</AppLayout>
	);
};

export default OrdersPage;

export const getServerSideProps = withPageAuth({ redirectTo: "/login" });
