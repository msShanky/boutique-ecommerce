import { Text, Group, Button, Mark, Image } from "@mantine/core";
import { getImageUrl } from "helpers/supabase-helper";

const OrderItem = (props: { orderItem: OrderItemWithRelations }) => {
	const { product, product_variant, quantity } = props.orderItem;
	const {
		code: poduct_code,
		images,
		title,
		category: { category },
	} = product;
	const { sku, size } = product_variant;

	const productLink = `/products/${category?.toLowerCase()}/${poduct_code}`;

	return (
		<div>
			<Group noWrap>
				<div style={{ position: "relative" }}>
					<Image
						src={getImageUrl(images?.length && images[0])}
						width={50}
						height={70}
						fit={"cover"}
						alt={"Order Item"}
					/>
					<Text style={{ position: "absolute", bottom: 3, right: 0 }}>
						<Mark>&nbsp;x&nbsp;{quantity}&nbsp;</Mark>
					</Text>
				</div>
				<div>
					<Button compact target="_blank" component="a" style={{ padding: 0 }} href={productLink} variant="subtle">
						<Text size="lg" weight={500}>
							{title}&nbsp;
							<Text span inline size="md" color="dimmed">
								({sku})
							</Text>
						</Text>
					</Button>

					<Text size="xs" sx={{ textTransform: "uppercase" }} weight={700} color="dimmed">
						{category}
					</Text>

					<Text size="lg">{size}</Text>
				</div>
			</Group>
		</div>
	);
};

export default OrderItem;
