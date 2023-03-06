import type { NextPage, NextPageContext } from "next";
import { Loader } from "@mantine/core";
import Head from "next/head";
import { AppLayout } from "@/components/layout";
import { HomeCarousal, CarousalCardSlider, CategorySection, SiteFeatureIcon } from "@/components/feature/home";
import { useAuthValidator } from "../helpers";
import { getHomePageData } from "../helpers/static_builder";
import { getCategoryMenuLinks } from "@/helpers/static_builder/menuLinks";

type HomePageProps = {
	menuLinks: Array<MenuLinkPropTypes>;
	featured: Array<ProductWithRelations>;
	categories: Array<ProductCategory>;
	bannerContent: Array<HomeCarousal>;
	apiMenuLinks: any;
};

const Home: NextPage<HomePageProps> = (props) => {
	const { isLoading, isWaitingForSignIn } = useAuthValidator();

	return (
		<AppLayout isLanding menuLinks={props.menuLinks}>
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
						{props.bannerContent.length > 0 && <HomeCarousal carousalContent={props.bannerContent} />}
						{/* TODO: [1] The featured card should be fetched from the database and populated with real products */}
						{props.featured.length > 0 && <CarousalCardSlider items={props.featured} />}
						{/* TODO: [1] The category should be fetched from the database and populated accordingly */}
						{/* TODO: Categories */}
						{props.categories && <CategorySection items={props.categories} />}
						<div className="container flex flex-col gap-6 mx-auto mt-20 md:flex-row justify-evenly">
							<SiteFeatureIcon
								icon="selected_with_love"
								label="Handpicked With Love"
								subText="Selectively Picked by The Team"
							/>
							<SiteFeatureIcon icon="quality" label="Assured quality" subText="Our products meet quality standards" />
						</div>
					</>
				)}
			</>
		</AppLayout>
	);
};

export default Home;

// TODO: [2] Menu links should be available inside the AppLayout so that all pages can access them
export async function getStaticProps() {
	const menuLinkResponse = await getCategoryMenuLinks();
	return {
		props: {
			menuLinks: menuLinkResponse,
			...(await getHomePageData()),
		}, // will be passed to the page component as props
	};
}
