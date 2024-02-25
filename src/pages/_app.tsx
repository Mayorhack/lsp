import Layout from "@/layout";
import "@/styles/globals.css";
import { notifyError } from "@/utils/notifier";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ToastContainer } from "react-toastify";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        onError: (error) => {
          if (error instanceof AxiosError) {
            notifyError(error.message);
          }
        },
      },
      mutations: {
        onError: (error) => {
          if (error instanceof AxiosError) {
            notifyError(error.message);
          }
        },
      },
    },
  });
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Lasepa</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ToastContainer />
      </QueryClientProvider>
    </SessionProvider>
  );
}
