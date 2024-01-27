import { IChildren } from "@/types";
import { ThemeProvider } from "@/components/seller/utils/theme-provider";

import React from "react";
import { Sidebar } from "@/components/super/Sidebar";
import Navbar from "@/components/super/Navbar";
import { AdminAuthProvider } from "@/utils/SuperAuth";
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
