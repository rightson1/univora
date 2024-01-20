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
export const Notifications = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <IoMdNotificationsOutline className="text-2xl" />
      </SheetTrigger>
      <SheetContent className="w-[300px]" overlay={false}>
        <SheetHeader>
          <SheetTitle className="self-start">Activity?</SheetTitle>
        </SheetHeader>
        <div className="fx-c mt-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div className=" flex gap-4  w-full py-4 bc border-b" key={i}>
              <Button size={"icon"} variant={"ghost"} className="shadow-sm">
                <IoIosClose className="text-xl" />
              </Button>
              <div className="fx-c gap-2 ">
                <div className="fb w-full ">
                  <h6 className="h6">New Order</h6>
                  <h6 className="h6">
                    166 d ago
                    <div className="w-2 h-2 rounded-full bg-blue-500 inline-block ml-2"></div>
                  </h6>
                </div>
                <p className="text-sm font-[300]">
                  You have a new order from <strong>John Doe</strong>
                </p>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
