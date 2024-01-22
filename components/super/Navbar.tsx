import React from "react";
import { IoSearch } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
import { SideDrawer } from "./Sidebar";
import { Notifications } from "./Notifications";
import { ModeToggle } from "../seller/utils/theme-switcher";
const Navbar = () => {
  return (
    <div className="h-[70px]  border-color-border border-b z-[6] bg-card fb p-4">
      <div className="fc gap-3">
        <div className="flex md:hidden">
          <SideDrawer />
        </div>
        <div className="hidden md:flex">Search</div>
      </div>

      <div className="fc gap-3">
        <Notifications />
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
