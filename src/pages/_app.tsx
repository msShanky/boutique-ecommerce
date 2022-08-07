import "../styles/globals.css";
// import { useState, useEffect } from "react";
import { MantineProvider, MantineTheme } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
// import { Session } from "@supabase/supabase-js";
import type { AppProps } from "next/app";
import { store } from "../app/store";
import { Provider } from "react-redux";
// import { UserProvider } from "@supabase/auth-helpers-react";
// import { supabaseClient } from "@supabase/auth-helpers-nextjs";
// import { useRouter } from "next/router";
// import { useHash } from "@mantine/hooks";
// import { GetServerSideProps } from "next";
import { AuthProvider } from "@/lib/auth";
import { supabase } from "@/lib/client";

const breezeTheme: Partial<MantineTheme> = {
	fontFamily: "Josefin Sans, sans-serif",
};

function MyApp({ Component, pageProps }: AppProps) {
	// const [session, setSession] = useState<Session | null>(null);
	// const [isRedirecting, setRedirection] = useState(false);
	// const router = useRouter();

	// useEffect(() => {
	// 	setSession(supabaseClient.auth.session());
	// 	supabaseClient.auth.onAuthStateChange((_event, session) => {
	// 		console.log("session changed for supabase auth", session);
	// 		setSession(session);
	// 		supabaseClient.auth.setSession(session?.refresh_token as string);
	// 	});
	// 	// supabaseClient.auth.setSession(session?.refresh_token as string);
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	// if (session) {
	// 	supabaseClient.auth.setSession(session?.refresh_token as string);
	// }

	// useEffect(() => {
	// 	console.log("The router change event ===> ", router);
	// 	const handleRouteChangeError = (err: any, url: any) => {
	// 		if (err.cancelled) {
	// 			console.log(`Route to ${url} was cancelled!`);
	// 		}
	// 	};

	// 	// router.events.on("routeChangeStart", () => {});

	// 	router.events.on("routeChangeError", handleRouteChangeError);

	// 	if (router.asPath.includes("access_token") && !isRedirecting) {
	// 		console.log(" -------- URL CONTAINS THE ACCESS_TOKEN AND NOT REDIRECTING -------- ");
	// 		setRedirection(true);
	// 		router.push("/", undefined, { shallow: true });
	// 	} else {
	// 		setRedirection(false);
	// 	}

	// 	return () => {
	// 		router.events.off("routeChangeError", handleRouteChangeError);
	// 	};
	// }, [router, isRedirecting]);

	return (
		<>
			<Provider store={store}>
				<MantineProvider withGlobalStyles withNormalizeCSS theme={breezeTheme}>
					<NotificationsProvider position="bottom-right">
						<AuthProvider supabase={supabase}>
							<Component {...pageProps} />
						</AuthProvider>
					</NotificationsProvider>
				</MantineProvider>
			</Provider>
		</>
	);
}

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
// 	const session = supabaseClient.auth.session();
// 	console.log(session, "SUPABASE SESSIOn");
// 	return {
// 		props: {}, // will be passed to the page component as props
// 	};
// };

export default MyApp;
