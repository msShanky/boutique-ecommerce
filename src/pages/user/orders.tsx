import { ReactElement, useEffect, useState } from "react";
import { supabaseClient, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { AppLayout } from "@/components/layout";
import { useUser } from "@supabase/auth-helpers-react";
import { Divider, Image, Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import { getImageUrl } from "@/helpers/supabase-helper";
import { Badge } from "@mantine/core";

const getFormattedStatus = (status: string): string => {
	const splitText = status.replace("_", " ").split(" ");
	const formattedText = splitText.map((text) => text.charAt(0).toUpperCase() + text.slice(1)).join(" ");
	return formattedText;
};

const orderBadgeColor = {
	// Stage 1
	order_placed: "bg-primary text-black",
	// Stage 2
	order_acknowledged: "text-black bg-amber-400",
	order_cancelled: "text-black bg-red-500",
	// Stage 3
	order_packed: "text-black bg-lime-300",
	// Stage 4
	order_shipped: "text-white bg-emerald-500",
	// Stage 5
	order_delivered: "text-black bg-green-500",
};

const OrdersPage = () => {
	const { user } = useUser();
	const [userOrders, setUserOrders] = useState<Array<UserOrderWithRelations> | undefined>();

	// TODO: [2] Orders should be sorted by time of creation or update
	const fetchUserOrders = async () => {
		const { data, error } = await supabaseClient
			.from("user_order")
			.select(`*, order_item(*, product(*), product_variant(*)), order_status(*)`)
			.eq("user_id", user?.id)
			.order("created_at", { ascending: false });
		if (!error) {
			setUserOrders(data);
		}
	};

	useEffect(() => {
		if (user) fetchUserOrders();
	}, [user]);

	const OrderItemCard = ({ item }: { item: OrderItemWithRelations }): ReactElement | null => {
		if (!item.product) return null;
		const { product_variant, product, quantity, add_on_details } = item;
		const baseImage = getImageUrl(product.images && product.images.length > 0 ? (product.images[0] as string) : "");
		return (
			<div className="flex flex-row gap-4 md:gap-10">
				<Image height={130} width={100} alt="product" radius={"md"} src={baseImage} />
				<div className="w-9/12 gap-2">
					<Title className="text-base md:text-2xl text-primary">{item.product.title}</Title>
					<Text className="text-sm md:text-base">{item.product.sub_title}</Text>
					<Text className="text-sm md:text-base">Size: {product_variant.size}</Text>
					<Text className="text-sm md:text-base">Quantity: {quantity}</Text>
					{/* @ts-ignore */}
					<Text className="text-sm md:text-base">AddOn: {add_on_details.label}</Text>
				</div>
			</div>
		);
	};

	return (
		<AppLayout pageTitle="User | Orders" menuLinks={[]}>
			<section className="container flex flex-wrap flex-col gap-10 mx-auto my-20 2xl:min-h-[550px] px-3">
				<h1>User Orders</h1>
				<>
					{userOrders &&
						userOrders.map((order, index) => {
							const { order_item, code, order_status, created_at } = order;
							return (
								<div
									key={`order_item_container_${(index + 9) * 50}`}
									className="relative flex flex-col self-center w-full p-4 space-y-4 rounded-md shadow-md md:w-4/6 bg-violet-light min-h-40"
								>
									<div className="flex flex-col justify-between w-full gap-2 md:flex-row">
										<div className="flex flex-col items-baseline w-full gap-2 md:flex-row">
											<Text>OrderId: {code}</Text>
											<Divider orientation="vertical" className="border-2" />
											<Text>{dayjs(created_at).format(`DD-MMM-YYYY hh:mm A`)}</Text>
										</div>
										{/* @ts-ignore */}
										<Badge className={`${orderBadgeColor[order_status.status]} w-6/12 md:w-60 mx-auto`}>
											{getFormattedStatus(order_status.status as string)}
										</Badge>
									</div>
									<div className="flex flex-col py-4 select-none gap-y-2">
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
