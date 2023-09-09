import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { extendTheme } from "@chakra-ui/react";
import Layout from "@/components/Layout";
import { AuthProvider } from "@/Context/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

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
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <AuthProvider>
        <Layout>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            <ReactQueryDevtools />
          </QueryClientProvider>
        </Layout>
      </AuthProvider>
    </ChakraProvider>
  );
}
