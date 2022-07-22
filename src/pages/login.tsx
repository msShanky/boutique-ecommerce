import React, { MouseEvent, useState } from "react";
import { PaperProps } from "@mantine/core";
import { useRouter } from "next/router";
import Head from "next/head";
import AuthForm from "../components/feature/auth/AuthForm";
import AppLayout from "../components/layout/AppLayout";
import { signInWithGoogle } from "../utils/auth";
import { supabase } from "../utils/supabaseClient";
// import { Anchor, Button, Checkbox, Divider, Group } from "@mantine/core";
// import { upperFirst, useForm, useToggle } from "@mantine/hooks";

const Login = (props: PaperProps<"div">) => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	// const loginUserWithGoogle = async (event: MouseEvent) => {
	// 	event.preventDefault();
	// 	console.log("The google flow is initiated");
	// 	const response = await signInWithGoogle();
	// 	console.log(response);
	// };

	const handleLogin = async (event: MouseEvent) => {
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
					<AuthForm handleGoogleLogin={handleLogin} />
				</main>
			</>
		</AppLayout>
	);
};

export default Login;
