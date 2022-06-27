import type { NextPage } from "next";
import Head from "next/head";
import FeaturedProducts from "../components/feature/home/FeaturedProducts";
import HomeBanner from "../components/feature/home/HomeBanner";
import LatestProducts from "../components/feature/home/LatestProducts";
import SiteFeatures from "../components/feature/SiteFeatures";
import AppLayout from "../components/layout/AppLayout";

const Home: NextPage = () => {
	return (
		<AppLayout>
			<>
				<Head>
					<title>Boutique E-Commerce | Home</title>
				</Head>
				<HomeBanner />
				<FeaturedProducts />
				<LatestProducts />
				<SiteFeatures />
			</>
		</AppLayout>
	);
};

export default Home;

