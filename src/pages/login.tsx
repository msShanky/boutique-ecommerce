import React, { MouseEvent, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import AuthForm from "../components/feature/auth/AuthForm";
import AppLayout from "../components/layout/AppLayout";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
// import { signInWithGoogle } from "../utils/auth";
// import { supabase } from "../utils/supabaseClient";

const Login = () => {
	const router = useRouter();
	const handleGoogleLogin = async (event: MouseEvent) => {
		console.log("THE GOOGLE LOGIN IS TRIGGERED", event);
		try {
			const { error, user } = await supabaseClient.auth.signIn(
				{ provider: "google" },
				{ redirectTo: "/" }
			);
			if (error) throw error;
		} catch (error) {
			console.log("there is an error with google signIn", error);
		}
		// setLoading(false);
	};

	// TODO: Handle user authentication errors
	// TODO: Add Facebook login

	return (
		<AppLayout>
			<>
				<Head>
					<title>Breeze Boutique | Login</title>
				</Head>
				<main className="container mx-auto mt-12">
					<AuthForm handleGoogleLogin={handleGoogleLogin} />
				</main>
			</>
		</AppLayout>
	);
};

export default Login;
