import type { NextPage, NextPageContext } from "next";
import { Loader, Image } from "@mantine/core";
import Head from "next/head";
import { AppLayout } from "@/components/layout";
import { HomeCarousal, CarousalCardSlider, CategorySection, SiteFeatureIcon } from "@/components/feature/home";
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
						<CarousalCardSlider items={props.featured} />
						{/* TODO: [1] The category should be fetched from the database and populated accordingly */}
						{/* TODO: Categories */}
						<CategorySection items={props.categories} />
						<div className="container flex flex-col gap-6 mx-auto mt-20 md:flex-row justify-evenly">
							<SiteFeatureIcon
								icon="selected_with_love"
								label="Handpicked With Love"
								subText="Selectively Picked by The Team"
							/>
							<SiteFeatureIcon
								icon="quality"
								label="Assured quality"
								subText="Our products meet quality standards"
							/>
						</div>
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
