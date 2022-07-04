import "../styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../app/store";
import { Provider } from "react-redux";

import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

function MyApp({ Component, pageProps }: AppProps) {
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

