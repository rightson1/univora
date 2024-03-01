"use client";
import React from "react";
import NavBar from "@/components/user/Navbar";

import Footer from "@/components/user/Footer";
import { UserAuth } from "@/utils/userAuth";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  //navigate to top of page on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <UserAuth>
      <NavBar />
      <div className="mt-20 min-h-[70vh] ">{children}</div>
      <Footer />
    </UserAuth>
  );
};

export default Layout;
