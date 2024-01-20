import React from "react";
import NavBar from "@/components/user/Navbar";
import { IChildren } from "@/types";
import Footer from "@/components/user/Footer";

const Layout = ({ children }: IChildren) => {
  return (
    <div
      className="bg-background  min-h-screen max-w-screen overflow-x-hidden
    "
    >
      <NavBar />

      <div className="mt-20 min-h-[70vh]">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
