import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NavContextProviders } from "./Providers/NavProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "./Providers/AuthContext.jsx";
import { CategoryProviders } from "./Providers/CategoryContext.jsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
      staleTime: 30 * 60 * 1000,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <NavContextProviders>
        <AuthContextProvider>
          <CategoryProviders>
            <App />
          </CategoryProviders>
        </AuthContextProvider>
      </NavContextProviders>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
