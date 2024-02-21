"use client";
import React, { useEffect } from "react";
import { ThemeProvider } from "next-themes";
const Layout = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const whiteColor = "#F0F0F0";
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
    <div
      className="min-h-screen max-w-screen overflow-x-hidden
    "
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="client"
        disableTransitionOnChange
        forcedTheme="client"
      >
        {children}
      </ThemeProvider>
    </div>
  );
};

export default Layout;
