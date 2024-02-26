import React from "react";
import { ModeToggle } from "@/components/seller/utils/theme-switcher";
import { Notifications } from "@/components/seller/utils/Notifications";
import { Help } from "@/components/seller/utils/Help";
import { PageSearch } from "@/components/seller/utils/PageSearch";
import { SideDrawer } from "./Sidebar";

const Navbar = () => {
  return (
    <div className="h-[70px]  border-color-border border-b z-[6] bg-card fb p-4">
      <div className="fc gap-3">
        <div className="flex md:hidden">
          <SideDrawer />
        </div>
        <div className="hidden md:flex">
          <PageSearch />
        </div>
      </div>

      <div className="fc gap-3">
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
