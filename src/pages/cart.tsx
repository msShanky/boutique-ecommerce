import { Image, Text, Title } from "@mantine/core";
import type { NextPage } from "next";
import Head from "next/head";
import { useAppSelector } from "../app/hooks";
import CartTable from "../components/feature/cart/CartTable";
import CartTotal from "../components/feature/cart/CartTotal";
import { AppLayout, AppSection } from "@/components/layout";
import Link from "next/link";

const Cart: NextPage = () => {
	const cartState = useAppSelector((state) => state.cart);

	return (
		<AppLayout pageTitle="User | cart" menuLinks={[]}>
			<>
				<Head>
					<title>Breeze Boutique | Cart</title>
				</Head>
				<AppSection>
					<>
						{cartState.products.length === 0 && (
							<div className="flex flex-col items-center justify-center select-none">
								<Image height={450} src="/images/404.svg" alt="No Orders Found" />
								<Title className="text-4xl font-thin text-violet">The Cart Is Empty</Title>
								<Link href="/products">
									<Text className="mt-8 hover:cursor-pointer hover:text-pink text=black underline">
										View Products
									</Text>
								</Link>
							</div>
						)}
						{cartState.products.length > 0 && (
							<div className="flex flex-row items-start justify-center w-full gap-10">
								<CartTable />
								<CartTotal />
							</div>
						)}
					</>
				</AppSection>
			</>
		</AppLayout>
	);
};

export default Cart;
