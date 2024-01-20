import React from "react";
import { IoSearch } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";

import { Button } from "../ui/button";
import { Help } from "./utils/Help";
import { Notifications } from "./utils/Notifications";
import { PageSearch } from "./utils/PageSearch";
import { SideDrawer } from "./utils/SideDrawer";
import { ModeToggle } from "./utils/theme-switcher";
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
        <Help />
        <Notifications />
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
