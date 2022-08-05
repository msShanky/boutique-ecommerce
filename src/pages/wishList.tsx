import { Title } from "@mantine/core";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import type { NextPage } from "next";
import Head from "next/head";
import { useAppSelector } from "../app/hooks";
import AppLayout from "../components/layout/AppLayout";

const WishListPage: NextPage = () => {
	const cartState = useAppSelector((state) => state.cart);

	return (
		<AppLayout>
			<>
				<Head>
					<title>Breeze Boutique | Checkout</title>
				</Head>
				<section className="flex w-full h-72 bg-violet-light">
					<div className="container flex flex-col justify-center mx-auto">
						<Title>Checkout</Title>
					</div>
				</section>
				<section className="container flex flex-wrap justify-center gap-10 mx-auto my-20">
					<Title>Wish listed products</Title>
				</section>
			</>
		</AppLayout>
	);
};

export default WishListPage;

export const getServerSideProps = withPageAuth({ redirectTo: "/login" });
