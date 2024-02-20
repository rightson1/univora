"use client";
import { IChildren } from "@/types";
import { ThemeProvider } from "@/components/seller/utils/theme-provider";
import React, { useEffect } from "react";
import { SellerAuthProvider } from "@/utils/sellerAuth";
const Layout = ({ children }: IChildren) => {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
    const head = document.querySelector("head");
    if (head) {
      head.style.background = "var(--background)";
    }
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SellerAuthProvider>{children}</SellerAuthProvider>
    </ThemeProvider>
  );
};

export default Layout;
