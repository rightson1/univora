"use client";
import React, { useEffect, useState } from "react";
import { User_General_Nav } from "@/components/user_general/user_general_nav";
import { User_Gen_Footer } from "@/components/user_general/footer";
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
      <User_Gen_Footer />
    </>
  );
};

export default Layout;
