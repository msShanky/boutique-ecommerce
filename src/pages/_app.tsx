import "../styles/globals.css";
import { MantineProvider, MantineTheme } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
// import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { store } from "../app/store";
import { Provider } from "react-redux";

import { UserProvider } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
// import { supabase } from "../utils/supabaseClient";
// import { Session } from "@supabase/supabase-js";

const breezeTheme: Partial<MantineTheme> = {
	fontFamily: "Josefin Sans, sans-serif",
};

function MyApp({ Component, pageProps }: AppProps) {
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

export default MyApp;

