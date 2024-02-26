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
import { useUser } from "@/utils/userAuth";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useGetSchool } from "@/utils/hooks/client/useSchool";
import { Avatar } from "../ui/avatar";
import {
  Contact,
  HomeIcon,
  LogIn,
  Save,
  School,
  Search,
  Shirt,
  Store,
  User,
  User2,
} from "lucide-react";
import { sell_url } from "@/utils/data";
export function MobileMenu() {
  const { user, handleSignIn } = useUser();
  const params = useParams();
  const { data: school, isLoading } = useGetSchool(params.school as string);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <Sheet open={open} onOpenChange={(nextOpen) => setOpen(nextOpen)}>
      <SheetTrigger className="hover:bg-background  p-5 fb-sm-h">
        <Image
          width={20}
          height={20}
          className=""
          src="/menu.svg"
          alt="Hussle Yangu Logo"
        />
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="p-0 w-[250px] blr-plain fx-c gap-2 "
        overlay={true}
      >
        <div className="flex justify-start p-4 pt-10 pb-5 rounded-b-md bg-background w-full   ">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="rounded-full shadow-md h-[50px] w-[50px]"
          >
            <School />
          </Button>
          <div className="fx-c">
            <span className="ml-2 font-semibold">{school?.name}</span>
            <span className="ml-2 text-indigo">{school?.subdomain}</span>
          </div>
        </div>
        <div className="flex justify-start p-4 w-full rounded-md bg-background   ">
          <div className="fx-c">
            <Link href={"/"}>
              <Button variant={"ghost"} className="font-semibold fc gap-2">
                <HomeIcon className="h-4" />
                <span>Home</span>
              </Button>
            </Link>
            <Link href={"/search"}>
              <Button variant={"ghost"} className="font-semibold fc gap-2">
                <Search className="h-4" />
                <span>Search</span>
              </Button>
            </Link>

            <Link href={"/sellers"}>
              <Button variant={"ghost"} className="font-semibold fc gap-2">
                <Store className="h-4" />
                <span>Shops</span>
              </Button>
            </Link>
            <Link href={"/contact"}>
              <Button variant={"ghost"} className="font-semibold fc gap-2">
                <Contact className="h-4" />
                <span>Contact me</span>
              </Button>
            </Link>
          </div>
        </div>
        {user && (
          <div className="flex justify-start p-4 w-full rounded-md bg-background   ">
            <div className="fx-c">
              <Link href={"/profile"}>
                <Button variant={"ghost"} className="font-semibold fc gap-2">
                  <User className="h-4" />
                  <span>Profile & Orders</span>
                </Button>
              </Link>

              <Link href={"/saved-items"}>
                <Button variant={"ghost"} className="font-semibold fc gap-2">
                  <Save className="h-4" />
                  <span>Saved Items</span>
                </Button>
              </Link>
            </div>
          </div>
        )}
        {!user && (
          <div className="flex justify-start p-4 w-full rounded-md bg-background   ">
            <div className="fx-c">
              <Button
                onClick={handleSignIn}
                variant={"ghost"}
                className="font-semibold fc gap-2"
              >
                <LogIn className="h-4" />
                <span>Login</span>
              </Button>

              <Button
                onClick={handleSignIn}
                variant={"ghost"}
                className="font-semibold fc gap-2"
              >
                <User2 className="h-4" />
                <span>Create Account</span>
              </Button>
            </div>
          </div>
        )}

        <div className="flex justify-start p-4 w-full rounded-md bg-background   ">
          <div className="fx-c">
            <Link href={sell_url}>
              <Button variant={"ghost"} className="font-semibold fc gap-2">
                <Shirt className="h-4" />
                <span>Sell</span>
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
