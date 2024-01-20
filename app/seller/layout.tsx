import Navbar from "@/components/seller/Navbar";
import Sidebar from "@/components/seller/Sidebar";
import { IChildren } from "@/types";
import { ThemeProvider } from "@/components/seller/utils/theme-provider";

import React from "react";
const Layout = ({ children }: IChildren) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="bg-background min-h-screen max-w-screen">
        <div
          className="hidden md:flex
         md:w-[250px] md:fixed h-full z-[5]"
        >
          <Sidebar />
        </div>
        <div className="w-full md:pl-[250px] relative z-[3]">
          <div className="sticky top-0 z-[4]">
            <Navbar />
          </div>
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
