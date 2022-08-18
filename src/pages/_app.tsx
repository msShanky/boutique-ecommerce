import "../styles/globals.css";
import { MantineProvider, MantineTheme } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import type { AppProps } from "next/app";
import { store } from "../app/store";
import { Provider } from "react-redux";
import { UserProvider, useUser } from "@supabase/auth-helpers-react";
import { AuthProvider } from "@/lib/auth";
import { supabase } from "@/lib/client";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";

const breezeTheme: Partial<MantineTheme> = {
	fontFamily: "Josefin Sans, sans-serif",
};

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	// const [authenticatedState, setAuthenticatedState] = useState("not-authenticated");

	// async function checkUser() {
	// 	const user = await supabase.auth.user();
	// 	if (user) {
	// 		setAuthenticatedState("authenticated");
	// 	}
	// }

	// async function handleAuthChange(event: AuthChangeEvent, session: Session | null) {
	// 	await fetch("/api/auth/user", {
	// 		method: "POST",
	// 		headers: new Headers({ "Content-Type": "application/json" }),
	// 		credentials: "same-origin",
	// 		body: JSON.stringify({ event, session }),
	// 	});
	// }

	// supabase.auth.onAuthStateChange((event, session) => {
	// 	console.log("THE EVENT CHANGED FOR AUTH", event);
	// 	console.log("THE SESSION VALUE AVAILABLE IS", session);
	// });

	// useEffect(() => {
	// 	const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
	// 		handleAuthChange(event, session);
	// 		if (event === "SIGNED_IN") {
	// 			setAuthenticatedState("authenticated");
	// 			router.push("/");
	// 		}
	// 		if (event === "SIGNED_OUT") {
	// 			setAuthenticatedState("not-authenticated");
	// 		}
	// 	});
	// 	checkUser();
	// 	return () => {
	// 		authListener?.unsubscribe();
	// 	};
	// }, [router]);

	return (
		<>
			<UserProvider supabaseClient={supabaseClient}>
				<Provider store={store}>
					<MantineProvider withGlobalStyles withNormalizeCSS theme={breezeTheme}>
						<NotificationsProvider position="bottom-right">
							<Component {...pageProps} />
						</NotificationsProvider>
					</MantineProvider>
				</Provider>
			</UserProvider>
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
