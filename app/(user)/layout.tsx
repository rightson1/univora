"use client";
import React, { useEffect } from "react";
import { ThemeProvider } from "next-themes";
const Layout = ({ children }: { children: React.ReactNode }) => {
  //set browser theme to light
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
    const head = document.querySelector("head");
    if (head) {
      head.style.background = "#F0F0F0";
    }
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
