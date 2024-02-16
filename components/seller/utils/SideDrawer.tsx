"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { IoMdMenu } from "react-icons/io";
import Sidebar from "../Sidebar";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
export const SideDrawer = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <Sheet open={open} onOpenChange={(nextOpen) => setOpen(nextOpen)}>
      <SheetTrigger>
        <IoMdMenu className="text-2xl text-foreground" />
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0 w-[250px] " overlay={false}>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
