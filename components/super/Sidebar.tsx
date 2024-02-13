"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IoCartOutline } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSuperAuth } from "@/utils/SuperAuth";
import { CiHome } from "react-icons/ci";
import { IoSchoolOutline } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
export const Sidebar = () => {
  const { user, logout } = useSuperAuth();
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
        <AvatarImage src={user?.photoURL} />
        <AvatarFallback className="">CN</AvatarFallback>
      </Avatar>
      <div className="fx-c">
        <span className="tsm">{user.role}</span>
        <span className=" font-bold">{user.displayName}</span>
      </div>
      <div className="fx-c">
        <Link href={"/"}>
          <Button variant={"ghost"} className="font-semibold fc gap-3  ">
            <CiHome className="mr-2 h-4 w-4 font-bold" />
            <span>Home</span>
          </Button>
        </Link>
        <Link href={"/schools"}>
          <Button variant={"ghost"} className="font-semibold fc gap-3  ">
            <IoSchoolOutline className="mr-2 h-4 w-4 font-bold" />
            <span>Schools</span>
          </Button>
        </Link>
        <Link href={"/categories"}>
          <Button variant={"ghost"} className="font-semibold fc gap-3  ">
            <CiShoppingCart className="mr-2 h-4 w-4 font-bold" />
            <span>Categories</span>
          </Button>
        </Link>
        <Link href={"/admins"}>
          <Button variant={"ghost"} className="font-semibold fc gap-3  ">
            <MdOutlineAdminPanelSettings className="mr-2 h-4 w-4 font-bold" />
            <span>Admins</span>
          </Button>
        </Link>

        <Button
          variant={"ghost"}
          className="font-semibold fc gap-3  "
          onClick={() => logout()}
        >
          <AiOutlineLogout className="mr-2 h-4 w-4 font-bold" />
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
