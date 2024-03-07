import React, { MouseEvent } from "react";
import { AuthForm, AuthFormLoader } from "@/components/feature/auth";
import AppLayout from "../components/layout/AppLayout";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import { useAuthValidator } from "../helpers";
// TODO: [4] Handle email login
// TODO: [4] Handle email sign up

// TODO: [5] Handle user authentication errors
// TODO: [5] Add Facebook login
// TODO: [5] Test the email sign up and login

const Login = () => {
	const { query } = useRouter();
	const { isLoading, isWaitingForSignIn } = useAuthValidator();

	const handleGoogleLogin = async (event: MouseEvent) => {
		// Every referrer URL needs to be configured in SUPABASE dashboard in Auth -> Setting -> Redirect URLs
		let redirectTo = window.location.origin;

		if (query.referrer) {
			redirectTo += `/${query.referrer}`;
		}

		try {
			const { error } = await supabaseClient.auth.signIn({ provider: "google" }, { redirectTo });
			if (error) throw error;
		} catch (error) {
			console.error("there is an error with google signIn", error);
		}
	};

	return (
		<AppLayout pageTitle="Breeze Boutique | Login" menuLinks={[]}>
			<>
				<main className="container mx-auto mt-40">
					{isLoading || isWaitingForSignIn ? <AuthFormLoader /> : <AuthForm handleGoogleLogin={handleGoogleLogin} />}
				</main>
			</>
		</AppLayout>
	);
};

export default Login;
