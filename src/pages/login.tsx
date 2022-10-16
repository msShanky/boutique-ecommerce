import React, { MouseEvent } from "react";
import Head from "next/head";
import AuthForm from "../components/feature/auth/AuthForm";
import AppLayout from "../components/layout/AppLayout";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";

const Login = () => {
	const { query } = useRouter();

	const handleGoogleLogin = async (event: MouseEvent) => {
		// Every referrer URL needs to be configured in SUPABASE dashboard in Auth -> Setting -> Redirect URLs
		let redirectTo = window.location.origin
		if (query.referrer) {
			redirectTo += `/${query.referrer}`
		}
		
		try {
			const { error } = await supabaseClient.auth.signIn(
				{ provider: "google" },
				{ redirectTo }
			);
			if (error) throw error;
		} catch (error) {
			console.log("there is an error with google signIn", error);
		}
	};

	// TODO: Handle email login
	const handleEmailLogin = () => { };
	// TODO: Handle email sign up
	const handleEmailSignUp = () => { };

	const handleEmailEvent = () => { };

	// TODO: Handle user authentication errors
	// TODO: Add Facebook login
	// TODO: Test the email sign up and login

	return (
		<AppLayout>
			<>
				<Head>
					<title>Breeze Boutique | Login</title>
				</Head>
				<main className="container mx-auto mt-12">
					{/* TODO: Display an overlay loader */}
					<AuthForm handleGoogleLogin={handleGoogleLogin} />
				</main>
			</>
		</AppLayout>
	);
};

export default Login;
