"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import { IoMdMenu } from "react-icons/io";
import Sidebar from "../Sidebar";
export const SideDrawer = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <IoMdMenu className="text-2xl text-foreground" />
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0 w-[250px] " overlay={false}>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
