import { IChildren } from "@/types";
import { ThemeProvider } from "@/components/seller/utils/theme-provider";

import React from "react";
import { Sidebar } from "@/components/super/Sidebar";
import Navbar from "@/components/super/Navbar";
import { SuperAdminAuthProvider } from "@/utils/SuperAuth";
const Layout = ({ children }: IChildren) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SuperAdminAuthProvider>{children}</SuperAdminAuthProvider>
    </ThemeProvider>
  );
};

export default Layout;
