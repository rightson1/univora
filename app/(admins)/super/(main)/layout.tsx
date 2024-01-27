"use client";
import { IChildren } from "@/types";
import React, { use, useEffect } from "react";
import { Sidebar } from "@/components/super/Sidebar";
import Navbar from "@/components/super/Navbar";
import { useAdminAuth } from "@/utils/SuperAuth";
import { useRouter } from "next/navigation";
import { DashboardLoading } from "@/components/shared/dashboard_loading";
const Layout = ({ children }: IChildren) => {
  const { user, admin } = useAdminAuth();
  const router = useRouter();
  useEffect(() => {
    if (!admin) {
      router.push("/login");
    }
    if (user && user.role !== "super_admin") {
      throw new Error("You are not authorized to view this page");
    }
  }, [admin, user, router]);
  if (!user) {
    return <DashboardLoading />;
  }
  return (
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
  );
};

export default Layout;
