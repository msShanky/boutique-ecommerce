import React, { FC } from "react";
import { Card } from "@mantine/core";
import { RiCashFill } from "@remixicon/react";
import { DonutChart, Icon, Legend, LineChart, List, ListItem, BarChart } from "@tremor/react";

type DetailedSectionProps = {
	data: any;
};

type CardWithIconProps = { value: number; label: string };

const CardWithIcon = (props: CardWithIconProps) => {
	return (
		<Card className="max-w-xs mx-auto bg-primaryAlt">
			<div className="flex items-center space-x-6">
				<Icon
					icon={RiCashFill}
					color="yellow"
					variant="light"
					tooltip="Sum of Sales"
					size="xl"
					className="rounded-full"
				/>
				<div>
					<p className="text-lg text-stone-400">{props.label}</p>
					<p className="text-5xl font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
						{props.value}
					</p>
				</div>
			</div>
		</Card>
	);
};

// const valueFormatter = (number: number) => `$ ${Intl.NumberFormat("en-IN").format(number).toString()}`;

export const DetailedSection: FC<DetailedSectionProps> = (props) => {
	const { data } = props;
	return (
		<>
			<div className="flex flex-wrap w-full">
				<CardWithIcon label="Total Order Prize" value={data.totalOrderPrice} />
				<CardWithIcon label="Average Order Value" value={data.averageOrderValue} />
				<CardWithIcon label="Monthly Order Count" value={data.monthlyOrders[0].monthly_orders ?? 0} />
			</div>
			<div className="flex flex-wrap w-full">
				<h3 className="my-6 text-xl font-semibold">Daily Orders</h3>
				<LineChart
					data={data.dailyOrders}
					className="mt-4 h-72"
					index="order_date"
					yAxisWidth={65}
					categories={["daily_orders"]}
				/>
			</div>
			<div className="flex flex-wrap w-full">
				<h3 className="my-6 text-xl font-semibold">Top selling size</h3>
				<BarChart data={data.variantCountBySize} index="size" categories={["variant_count"]} colors={["indigo"]} />
			</div>
			{/* ROW 2 */}
			<div className="flex items-center justify-center w-full gap-4">
				<div className="flex flex-col items-center justify-center space-x-6">
					<h3 className="px-4 my-6 text-xl font-semibold">Order By Status</h3>
					<DonutChart
						data={data.orderStatusCount}
						category="status_count"
						index={"order_status.status_text"}
						colors={["blue", "cyan", "indigo", "violet", "fuchsia"]}
						className="w-40 p-2 border-none outline-none"
					/>
					{/* @ts-ignore */}
					<Legend categories={data.orderStatusCount.map((val) => val.order_status.status_text)} className="max-w-xs" />
				</div>
				<div className="mx-auto w-96">
					<h3 className="my-6 text-xl font-semibold">Sold Aggregations</h3>
					<List>
						{data.soldAggregation.map((val: any) => {
							return (
								<ListItem key={`product_${val.product_id}`} className="grid grid-cols-8">
									<span className="col-span-6">{val.product.title}</span>
									<span>{val.total_quantity_sold}</span>
									<span>{val.total_sold_price}</span>
								</ListItem>
							);
						})}
					</List>
				</div>
			</div>
		</>
	);
};
