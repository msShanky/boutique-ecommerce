import React, { MouseEvent, useState } from "react";

import { useRouter } from "next/router";
import Head from "next/head";
import AuthForm from "../components/feature/auth/AuthForm";
import AppLayout from "../components/layout/AppLayout";
import { signInWithGoogle } from "../utils/auth";
// import { supabase } from "../utils/supabaseClient";

const Login = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleGoogleLogin = async (event: MouseEvent) => {
		console.log("THE GOOGLE LOGIN IS TRIGGERED", event);
		try {
			setLoading(true);
			const { error, user } = await signInWithGoogle();
			// const { error, user } = await supabase.auth.signIn({ provider: "google" });
			console.log(error, "ERROR CHANGED");
			console.log(user, "USER CHANGED");
			if (error) throw error;
		} catch (error) {
			console.log("there is an error with google signIn");
		} finally {
			setLoading(false);
		}
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
