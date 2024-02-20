"use client";
import React from "react";
import NavBar from "@/components/user/Navbar";

import Footer from "@/components/user/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <div className="mt-20 min-h-[70vh] ">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
