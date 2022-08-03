import React, { MouseEvent, useState } from "react";
import { PaperProps } from "@mantine/core";
import { useRouter } from "next/router";
import Head from "next/head";
import AuthForm from "../components/feature/auth/AuthForm";
import AppLayout from "../components/layout/AppLayout";
import { supabase } from "../utils/supabaseClient";

const Login = (props: PaperProps<"div">) => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleGoogleLogin = async (event: MouseEvent) => {
		try {
			setLoading(true);
			const { error } = await supabase.auth.signIn({ provider: "google" });
			if (error) throw error;
		} catch (error) {
			console.log("there is an error with google signIn");
		} finally {
			setLoading(false);
		}
	};

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
