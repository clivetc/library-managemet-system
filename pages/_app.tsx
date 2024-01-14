import Layout from "@/components/Layout";
import store from "@/redux/store";
import { CSSReset, ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Suspense, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";

const colors = {
	brand: {
		900: "#800080",
		800: "#333333",
		700: "#2a69ac",
	},
};

export const theme = extendTheme({ colors });
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
	const [domLoaded, setDomLoaded] = useState(false);

	useEffect(() => {
		setDomLoaded(true);
	}, []);

	if (!domLoaded) return <></>;
	return (
		<div>
			<ChakraProvider theme={theme}>
				<CSSReset />
				<QueryClientProvider client={queryClient}>
					<Provider store={store}>
						<Suspense fallback={<div>Loading...</div>}>
							<Layout>
								<Component {...pageProps} />
							</Layout>
						</Suspense>
					</Provider>
				</QueryClientProvider>
			</ChakraProvider>
		</div>
	);
}
