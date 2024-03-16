import "../styles/globals.css";
// import "../styles/embla.css";
import { MantineProvider, MantineTheme, MantineThemeOverride } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import type { AppProps } from "next/app";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../app/store";
import { Provider } from "react-redux";
import { UserProvider } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

const breezeTheme: MantineThemeOverride = {
	fontFamily: "Poppins, sans-serif",
	colors: {
		"brand-yellow": [
			"#fef7e7",
			"#fbe8b7",
			"#f8d987",
			"#f5cb5c",
			"#f2ba27",
			"#d8a10d",
			"#a87d0a",
			"#785907",
			"#483604",
			"#181201",
		],
	},
	primaryColor: "brand-yellow",
	primaryShade: 3,
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
