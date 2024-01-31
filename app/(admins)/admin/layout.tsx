import { IChildren } from "@/types";
import { ThemeProvider } from "@/components/seller/utils/theme-provider";
import React from "react";
import { AdminAuthProvider } from "@/utils/AdminAuth";

const Layout = ({ children }: IChildren) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AdminAuthProvider>{children}</AdminAuthProvider>
    </ThemeProvider>
  );
};

export default Layout;
