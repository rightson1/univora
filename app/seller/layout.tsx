"use client";
import { IChildren } from "@/types";
import { ThemeProvider } from "@/components/seller/utils/theme-provider";
import React, { useEffect } from "react";
import { SellerAuthProvider } from "@/utils/sellerAuth";
const Layout = ({ children }: IChildren) => {
  useEffect(() => {
    const whiteColor = "#0000";
    function updateThemeColor() {
      const metaTag = document.querySelector('meta[name="theme-color"]');
      if (metaTag) {
        metaTag.setAttribute("content", whiteColor);
      }
    }
    updateThemeColor();
    return () => {};
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
