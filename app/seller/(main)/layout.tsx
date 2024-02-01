"use client";
import Navbar from "@/components/seller/Navbar";
import Sidebar from "@/components/seller/Sidebar";
import { IChildren } from "@/types";
import { ThemeProvider } from "@/components/seller/utils/theme-provider";
import React, { useEffect } from "react";
import { useAdminAuth } from "@/utils/AdminAuth";
import { DashboardLoading } from "@/components/shared/dashboard_loading";
import { useSellerAuth } from "@/utils/sellerAuth";
import { useRouter } from "next/navigation";
const Layout = ({ children }: IChildren) => {
  const { seller, admin } = useSellerAuth();
  const router = useRouter();
  useEffect(() => {
    if (!admin) {
      router.push("/login");
    }
  }, [admin, router]);

  if (!seller) {
    return <DashboardLoading />;
  }
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
