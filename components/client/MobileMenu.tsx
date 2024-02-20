"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
export function MobileMenu() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="hover:bg-background  p-5 fb-sm-h">
          <Image
            width={20}
            height={20}
            className=""
            src="/menu.svg"
            alt="Hussle Yangu Logo"
          />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[325px] blr fx-c items-center justify-center">
        <DialogHeader className="w-full">
          <DialogTitle>Menu</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col   w-full">
          <Button variant="link" size="sm" className="hover:bg-background">
            Home
          </Button>
          <Button variant="link" size="sm" className="hover:bg-background">
            Contact Us
          </Button>
          <Button variant="link" size="sm" className="hover:bg-background">
            Services
          </Button>
          <Button variant="link" size="sm" className="hover:bg-background">
            Blogs
          </Button>
          <Button variant="link" size="sm" className="hover:bg-background">
            Sell
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
