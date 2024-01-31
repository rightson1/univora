"use client";
import React, { useEffect, useState } from "react";
import NavBar from "@/components/user/Navbar";

import Footer from "@/components/user/Footer";
import { SchoolSelect } from "@/components/user/SchoolSelect";
import { useRouter } from "next/navigation";

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
      className="bg-background  min-h-screen max-w-screen overflow-x-hidden
    "
    >
      <NavBar />
      {/* {!school && <SchoolSelect />} */}

      <div className="mt-20 min-h-[70vh]">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
