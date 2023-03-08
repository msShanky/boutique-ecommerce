import "../styles/globals.css";
import { MantineProvider, MantineTheme } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import type { AppProps } from "next/app";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../app/store";
import { Provider } from "react-redux";
import { UserProvider } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

const breezeTheme: Partial<MantineTheme> = {
	fontFamily: "Poppins, sans-serif",
};

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<UserProvider supabaseClient={supabaseClient}>
				<Provider store={store}>
					<PersistGate loading={null} persistor={persistor}>
						<MantineProvider withGlobalStyles withNormalizeCSS theme={breezeTheme}>
							<NotificationsProvider position="bottom-right">
								<Component {...pageProps} />
							</NotificationsProvider>
						</MantineProvider>
					</PersistGate>
				</Provider>
			</UserProvider>
		</>
	);
}

export default MyApp;
