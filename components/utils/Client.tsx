"use client";
import { AuthProvider } from "@/utils/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProgressBar from "next-nprogress-bar";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";

const Client = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <AuthProvider>
        <ProgressBar
          height="6px"
          color="000"
          options={{ showSpinner: false }}
          shallowRouting
          appDirectory
        />
        {children}
      </AuthProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default Client;
