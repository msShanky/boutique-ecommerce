import type { NextPage, NextPageContext } from "next";
import { Loader } from "@mantine/core";
import { AppLayout } from "@/components/layout";
import { HomeCarousalNew, CarousalCardSliderNew, CategorySection, SiteFeatureIcon } from "@/components/feature/home";
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
		<AppLayout pageTitle="Breeze Boutique | Home" isLanding menuLinks={props.menuLinks}>
			<>
				{/* TODO: [4] Replace this loader with something decent with animations */}
				{isLoading && isWaitingForSignIn && (
					<section className="container flex justify-center my-20 mt-60 h-80">
						<Loader size={300} />
					</section>
				)}
				{!isLoading && !isWaitingForSignIn && (
					<>
						{/* FIXME: [1] [Prod] Replace the images or optimize the banner images, the page load times are high with the Images  */}
						{props.bannerContent.length > 0 && <HomeCarousalNew carousalContent={props.bannerContent} />}
						{/* TODO: [3] [Accessibility] featured products does not display link when hovered */}
						{/* TODO: [2] [Cosmetic] display additional information (subtitle) in the featured  */}
						{/* TODO: [2] [Functionality] product wishlist does nor work  */}
						{props.featured.length > 0 && <CarousalCardSliderNew items={props.featured} />}
						{/* TODO: [2] [ReUsability] Re use same components for gender listing page and home page */}
						{/* {props.categories && <CategorySection items={props.categories} />} */}
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
