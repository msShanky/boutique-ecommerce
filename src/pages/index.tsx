import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import AppLayout from "../components/layout/AppLayout";
import { HomeCarousal } from "../components/feature/home";
import { Loader } from "@mantine/core";
import { useAuthValidator } from "../helpers";

type HomePageProps = {
	menuLinks: Array<{ label: string; link: string }>;
};

const Home: NextPage<HomePageProps> = (props) => {
	const { isLoading, isWaitingForSignIn } = useAuthValidator();

	return (
		<AppLayout menuLinks={props.menuLinks}>
			<>
				<Head>
					<title>Breeze Boutique | Home</title>
				</Head>
				{/* TODO: Replace this loader with something decent with animations */}
				{(isLoading || isWaitingForSignIn) && (
					<section className="container mx-auto my-20 h-80">
						<Loader size={300} />
					</section>
				)}
				{/* {!isLoading && !isWaitingForSignIn && <HomeBanner />} */}
				{!isLoading && !isWaitingForSignIn && <HomeCarousal />}
				
			</>
		</AppLayout>
	);
};

export default Home;

export async function getStaticProps(context: NextPageContext) {
	return {
		props: {
			menuLinks: [
				{
					label: "Men",
					link: "/shop/men",
				},
				{
					label: "Women",
					link: "/shop/women",
				},
				{
					label: "Kids",
					link: "/shop/kids",
				},
			],
		}, // will be passed to the page component as props
	};
}
