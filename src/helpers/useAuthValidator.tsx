import { getFragmentParams } from "@/lib/get-fragment-params";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export const useAuthValidator = () => {
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

	return { isLoading, shouldRedirect, isWaitingForSignIn };
};
