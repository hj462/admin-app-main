import "../styles/globals.css";
import { createContext, useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Context } from "../components/hooks/geographyContext";
import { GetFromStorage } from "../components/utils/Common";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [geography, setGeography] = useState("");
  const selectedGeography = GetFromStorage("geography");

  useEffect(() => {
    if (selectedGeography) {
      setGeography(selectedGeography || "");
    }
  }, [selectedGeography]);

  return (
    <SessionProvider session={session}>
      <Context.Provider value={{ geography, setGeography }}>
        <QueryClientProvider client={queryClient}>
          <Toaster position="top-center" reverseOrder={false} gutter={8} />
          <div>
            <Component {...pageProps} />
          </div>
        </QueryClientProvider>
      </Context.Provider>
    </SessionProvider>
  );
}
