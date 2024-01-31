import { IChildren } from "@/types";
import { ThemeProvider } from "@/components/seller/utils/theme-provider";
import React from "react";
import { SellerAuthProvider } from "@/utils/sellerAuth";
const Layout = ({ children }: IChildren) => {
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
