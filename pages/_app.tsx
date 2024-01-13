import React, { Suspense } from "react";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { extendTheme } from "@chakra-ui/react";
import Layout from "@/components/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "@/redux/store";

const colors = {
	brand: {
		900: "#800080",
		800: "#333333",
		700: "#2a69ac",
	},
};

export const theme = extendTheme({ colors });
const queryClient = new QueryClient();

// Lazy load the Layout component
const LazyLayout = React.lazy(() => import("@/components/Layout"));

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<CSSReset />
			<QueryClientProvider client={queryClient}>
				<Provider store={store}>
					<Suspense fallback={<div>Loading...</div>}>
						<LazyLayout>
							<Component {...pageProps} />
						</LazyLayout>
					</Suspense>
				</Provider>
			</QueryClientProvider>
		</ChakraProvider>
	);
}
