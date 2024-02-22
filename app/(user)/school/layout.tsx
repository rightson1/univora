"use client";
import React from "react";
import NavBar from "@/components/user/Navbar";

import Footer from "@/components/user/Footer";
import { UserAuth } from "@/utils/userAuth";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserAuth>
      <NavBar />
      <div className="mt-20 min-h-[70vh] ">{children}</div>
      <Footer />
    </UserAuth>
  );
};

export default Layout;
