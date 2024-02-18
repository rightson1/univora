"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IoCartOutline } from "react-icons/io5";
import { IoIosSettings, IoMdMenu } from "react-icons/io";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
export const Sidebar = () => {
  const pathname = usePathname().split("/")[1];

  return (
    <div
      className="w-[250px] border-color-border border-r 
      z-[10]
      h-full
    bg-card p-4 
    fx-c gap-5 "
    >
      <Avatar className="p-[2px] ring-1 ring-ring">
        <AvatarImage />
        <AvatarFallback className="">CN</AvatarFallback>
      </Avatar>
      <div className="fx-c">
        <span className="tsm">Store</span>
        <span className=" font-bold">Rightsons Store</span>
      </div>
      <div className="fx-c">
        <Link href={"/"}>
          <Button variant={"ghost"} className="font-semibold fc gap-3  ">
            <MdOutlineProductionQuantityLimits className="mr-2 h-4 w-4 font-bold" />
            <span>Businesses</span>
          </Button>
        </Link>

        {/* <Link href={"/seller/settings"}>
          <Button variant={"ghost"} className="font-semibold fc gap-3  ">
            <IoIosSettings className="mr-2 h-4 w-4 font-bold" />
            <span>Promoted</span>
          </Button>
        </Link> */}

        <Button variant={"ghost"} className="font-semibold fc gap-3  ">
          <IoCartOutline className="mr-2 h-4 w-4 font-bold" />
          <span>
            <span>Logout</span>
          </span>
        </Button>
      </div>
    </div>
  );
};

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
