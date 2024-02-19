"use client";
import React, { useEffect, useState } from "react";
import NavBar from "@/components/user/Navbar";

import Footer from "@/components/user/Footer";

import { useRouter } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { User_General_Nav } from "@/components/user_general/user_general_nav";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [school, setSchool] = useState(true);
  const router = useRouter();

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     if (localStorage.getItem("school")) {
  //       console.log(localStorage.getItem("school"));
  //       setSchool(true);
  //     } else {
  //       console.log("no school");
  //       setSchool(false);
  //     }
  //     const handleStorageChange = (e: StorageEvent) => {
  //       console.log(e.key);
  //       if (e.key === "school") {
  //         console.log(e.newValue);
  //         if (e.newValue) {
  //           router.push(`/${e.newValue}`);
  //           setSchool(true);
  //         } else {
  //           setSchool(false);
  //         }
  //       } else {
  //         console.log("no school");
  //         setSchool(false);
  //       }
  //     };

  //     window.addEventListener("storage", handleStorageChange);

  //     return () => {
  //       window.removeEventListener("storage", handleStorageChange);
  //     };
  //   }
  // }, [router]);
  // console.log(school);
  return (
    <div
      className="min-h-screen max-w-screen overflow-x-hidden
    "
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="client"
        // enableSystem
        disableTransitionOnChange
        forcedTheme="client"
      >
        <User_General_Nav />
        {/* {!school && <SchoolSelect />} */}

        <div
          className="mt-20 min-h-[70vh]
      
        "
        >
          {children}
        </div>
        <Footer />
      </ThemeProvider>
    </div>
  );
};

export default Layout;
