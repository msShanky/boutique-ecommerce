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
					<title>Breeze Boutique | WishList</title>
				</Head>
				<section className="container flex flex-wrap min-h-screen gap-10 mx-auto my-20">
					<Title className="text-4xl font-bold text-violet" order={1}>
						Wish listed products
					</Title>
					<div>
						
					</div>
				</section>
			</>
		</AppLayout>
	);
};

export default WishListPage;

export const getServerSideProps = withPageAuth({ redirectTo: "/login" });
