import { Anchor, Button, Checkbox, Divider, Group } from "@mantine/core";
import { Paper, PaperProps, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { upperFirst, useForm, useToggle } from "@mantine/hooks";
import Head from "next/head";
import React from "react";
import AuthForm from "../components/feature/auth/AuthForm";
import AppLayout from "../components/layout/AppLayout";

const Login = (props: PaperProps<"div">) => {
	return (
		<AppLayout>
			<>
				<Head>
					<title>Breeze Boutique | Login</title>
				</Head>
				<main className="container mx-auto mt-12">
					<AuthForm paperProps={{}} />
				</main>
			</>
		</AppLayout>
	);
};

export default Login;
