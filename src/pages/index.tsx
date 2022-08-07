import type { NextPage } from "next";
import Head from "next/head";
import AppLayout from "../components/layout/AppLayout";
import HomeBanner from "../components/feature/home/HomeBanner";
import { useRouter } from "next/router";
import { useEffect } from "react";
// import FeaturedProducts from "../components/feature/home/FeaturedProducts";
// import LatestProducts from "../components/feature/home/LatestProducts";
// import SiteFeatures from "../components/feature/SiteFeatures";

const Home: NextPage = () => {
	const router = useRouter();

	// useEffect(() => {
	// 	console.log("The router change event ===> ", router);
	// 	if (router.asPath.includes("access_token")) {
	// 		router.push("/", undefined, { shallow: true });
	// 	}
	// }, [router]);

	return (
		<AppLayout>
			<>
				<Head>
					<title>Breeze Boutique | Home</title>
				</Head>
				<HomeBanner />
				{/* <div className="flex flex-col items-center justify-center mt-16 select-none">
					<Title order={1} className="my-16 text-6xl font-bold">
						Breeze Boutique
					</Title>
					<Image src="/images/under_construction.svg" alt="under construction" />
					<Title className="mt-12 text-4xl font-thin text-violet">The Site Is Under Construction</Title>
				</div> */}
				{/* <FeaturedProducts /> */}
				{/* <LatestProducts /> */}
				{/* <SiteFeatures /> */}
			</>
		</AppLayout>
	);
};

// export const

export default Home;

