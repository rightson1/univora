"use client";
import React, { useEffect, useState } from "react";
import Footer from "@/components/user/Footer";
import { User_General_Nav } from "@/components/user_general/user_general_nav";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <User_General_Nav />
      <div
        className="mt-20 min-h-[70vh]
      
        "
      >
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
