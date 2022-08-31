import type { NextPage } from "next";
import Head from "next/head";
import AppLayout from "../components/layout/AppLayout";
import HomeBanner from "../components/feature/home/HomeBanner";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { getFragmentParams } from "@/lib/get-fragment-params";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { Loader } from "@mantine/core";
// import FeaturedProducts from "../components/feature/home/FeaturedProducts";
// import LatestProducts from "../components/feature/home/LatestProducts";
// import SiteFeatures from "../components/feature/SiteFeatures";

const Home: NextPage = () => {
	const router = useRouter();
	const { user, isLoading } = useUser();
	const [shouldRedirect, setShouldRedirect] = useState(false);
	const isSignedIn = user;
	let isWaitingForSignIn = false;
	let refreshToken: string;

	if (!isSignedIn) {
		/**
		 * Get fragment params. Will only exist if bug happens in supabase helpers -
		 * causing the successful signin with third party to not be registered -
		 * here on client side after re-direct from provider.
		 */
		const fragmentParams = getFragmentParams(router.asPath);
		refreshToken = fragmentParams.refresh_token;

		if (refreshToken) {
			/* Function to manually sign user in with refresh token from fragment. */
			const signUserInWithRefreshToken = () => {
				supabaseClient.auth.setSession(refreshToken);
			};
			/*
			 * To avoid sign in page flicker while waiting for sign in.
			 * Page will re-render after successful sign in and isWaitingForSignIn -
			 * will be set to false while isSignedIn will be true
			 */
			isWaitingForSignIn = true;
			signUserInWithRefreshToken();
		}
	}

	useEffect(() => {
		if (shouldRedirect && !isWaitingForSignIn) {
			router.replace(router.pathname, undefined);
		}
	}, [shouldRedirect, router, isWaitingForSignIn]);

	useEffect(() => {
		if (router.asPath.includes("access_token")) {
			setTimeout(() => {
				setShouldRedirect(true);
			}, 1400);
		} else {
			setShouldRedirect(false);
		}
	}, [router]);

	return (
		<AppLayout>
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
				{!isLoading && !isWaitingForSignIn && <HomeBanner />}
			</>
		</AppLayout>
	);
};

export default Home;
