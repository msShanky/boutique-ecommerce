import "../styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../app/store";
import { Provider } from "react-redux";

import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { Session } from "@supabase/supabase-js";
import { useAppDispatch } from "../app/hooks";
import { updateUserSession } from "../reducer/user";

function MyApp({ Component, pageProps }: AppProps) {
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		setSession(supabase.auth.session());
		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);			
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	console.log("The session value from the auth is", session);

	return (
		<>
			<Provider store={store}>
				<MantineProvider withGlobalStyles withNormalizeCSS>
					<NotificationsProvider position="top-right">
						<Component {...pageProps} />
					</NotificationsProvider>
				</MantineProvider>
			</Provider>
		</>
	);
}

export default MyApp;

