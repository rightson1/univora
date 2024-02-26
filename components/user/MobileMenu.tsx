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
import { sell_url } from "@/utils/data";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <div className="flex flex-col  items-center justify-center   w-full">
          <Link href="/" className="">
            <Button variant="link" size="sm" className="hover:bg-background">
              Home
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="link" size="sm" className="hover:bg-background">
              Contact Me
            </Button>
          </Link>
          <Link href={sell_url}>
            <Button variant="link" size="sm" className="hover:bg-background">
              Sell
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
