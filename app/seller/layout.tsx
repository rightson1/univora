import { IChildren } from "@/types";
import { ThemeProvider } from "@/components/seller/utils/theme-provider";
import React, { useEffect } from "react";
import { SellerAuthProvider } from "@/utils/sellerAuth";
const Layout = ({ children }: IChildren) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <meta name="theme-color" content="#000000" />
      <SellerAuthProvider>{children}</SellerAuthProvider>
    </ThemeProvider>
  );
};

export default Layout;
