import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { AppLayout } from "@/components/layout";
import { HomeCarousal, CarousalCardSlider, CategorySection } from "@/components/feature/home";
import { Loader } from "@mantine/core";
import { useAuthValidator } from "../helpers";
import { getHomePageData } from "../lib";

type HomePageProps = {
	menuLinks: Array<{ label: string; link: string }>;
	featured: Array<ProductWithRelations>;
	categories: Array<ProductCategory>;
};

const Home: NextPage<HomePageProps> = (props) => {
	const { isLoading, isWaitingForSignIn } = useAuthValidator();

	console.log("The props received are ", props);

	return (
		<AppLayout menuLinks={props.menuLinks}>
			<>
				<Head>
					<title>Breeze Boutique | Home</title>
				</Head>
				{/* TODO: [3] Replace this loader with something decent with animations */}
				{isLoading && isWaitingForSignIn && (
					<section className="container mx-auto my-20 h-80">
						<Loader size={300} />
					</section>
				)}
				{/* Home Landing Section */}
				{!isLoading && !isWaitingForSignIn && (
					<>
						<HomeCarousal />
						{/* TODO: [1] The featured card should be fetched from the database and populated with real products */}
						{/* TODO: Featured */}
						{/* TODO: Categories */}
						<CarousalCardSlider items={props.featured} />
						{/* TODO: [1] The category should be fetched from the database and populated accordingly */}
						<CategorySection items={props.categories} />
					</>
				)}
			</>
		</AppLayout>
	);
};

export default Home;

// TODO: [2] Menu links should be available inside the AppLayout so that all pages can access them
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
			...(await getHomePageData()),
		}, // will be passed to the page component as props
	};
}
