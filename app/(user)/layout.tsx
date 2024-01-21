"use client";
import React, { useEffect, useState } from "react";
import NavBar from "@/components/user/Navbar";
import { IChildren } from "@/types";
import Footer from "@/components/user/Footer";
import { SchoolSelect } from "@/components/user/SchoolSelect";
import { useRouter } from "next/navigation";

const Layout = ({ children }: IChildren) => {
  const [school, setSchool] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "school") {
        if (e.newValue) {
          router.push(`/${e.newValue}`);
          setSchool(true);
        } else {
          setSchool(false);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [router]);
  return (
    <div
      className="bg-background  min-h-screen max-w-screen overflow-x-hidden
    "
    >
      <NavBar />
      {!school && <SchoolSelect />}

      <div className="mt-20 min-h-[70vh]">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
