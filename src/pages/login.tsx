import { Title } from "@mantine/core";
import Head from "next/head";
import React from "react";
import AppLayout from "../components/layout/AppLayout";

const Login = () => {
	return (
		<AppLayout>
			<>
				<Head>
					<title>Breeze Boutique | Login</title>
				</Head>
				<Title order={1}>Login Works</Title>
			</>
		</AppLayout>
	);
};

export default Login;
