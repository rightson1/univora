"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IoCartOutline } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { IoIosHome } from "react-icons/io";
import { useSellerAuth } from "@/utils/sellerAuth";
import { LogOut, Settings } from "lucide-react";
const Sidebar = () => {
  const pathname = usePathname().split("/")[1];
  const { seller, logout } = useSellerAuth();
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
        <AvatarFallback className="">
          <span className="font-bold text-2xl">
            {seller?.name?.split("")[0]}
          </span>
        </AvatarFallback>
      </Avatar>
      <div className="fx-c">
        <span className="tsm">Store</span>
        <span className=" font-bold">{seller?.name?.split(" ")[0]}s Store</span>
      </div>
      <div className="fx-c">
        <Link href={"/"}>
          <Button variant={"ghost"} className="font-semibold fc gap-3">
            <IoIosHome className="mr-2 h-4 w-4 font-bold" />
            <span>Home</span>
          </Button>
        </Link>

        <Link href={"/orders"}>
          <Button variant={"ghost"} className="font-semibold fc gap-3">
            <IoCartOutline className="mr-2 h-4 w-4 font-bold" />
            <span>Orders</span>
          </Button>
        </Link>
        <Link href={"/products"}>
          <Button variant={"ghost"} className="font-semibold fc gap-3  ">
            <MdOutlineProductionQuantityLimits className="mr-2 h-4 w-4 font-bold" />
            <span>Products</span>
          </Button>
        </Link>
        <Link href={"/settings"}>
          <Button variant={"ghost"} className="font-semibold fc gap-3  ">
            <IoIosSettings className="mr-2 h-4 w-4 font-bold" />
            <span>Settings</span>
          </Button>
        </Link>

        <Button
          variant={"ghost"}
          className="font-semibold fc gap-3  "
          onClick={() => logout()}
        >
          <LogOut className="mr-2 h-4 w-4 font-bold" />
          <span>
            <span>Logout</span>
          </span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
