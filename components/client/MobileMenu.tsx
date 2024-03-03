"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@/utils/userAuth";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useGetSchool } from "@/utils/hooks/client/useSchool";
import {
  Contact,
  Download,
  HomeIcon,
  LogIn,
  Save,
  School,
  School2,
  Search,
  Shield,
  Shirt,
  Store,
  User,
  User2,
} from "lucide-react";
import { schools_domain, sell_url } from "@/utils/data";
export function MobileMenu() {
  const { user, handleSignIn } = useUser();
  const params = useParams();
  const { data: school, isLoading } = useGetSchool(params.school as string);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [isInstallable, setIsInstallable] = useState<boolean>(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isAppInstalled, setIsAppInstalled] = useState<boolean>(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Check if the app is already installed
    window.addEventListener("appinstalled", () => {
      setIsAppInstalled(true);
    });

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleClick = () => {
    //alert user to tell him to make sure this is his school
    if (
      !window.confirm(
        `Are you sure your school is ${school?.name},If yes click ok to download the app`
      )
    ) {
      return;
    }

    if (!deferredPrompt) {
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }

      // Clear the saved prompt since it can't be used again
      setDeferredPrompt(null);
      setIsInstallable(false);
    });
  };

  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  const LinkButton = (btn: {
    text: string;
    icon: React.ComponentType<{ className?: string }>;
    onClick?: () => void;
  }) => {
    return (
      <Button
        onClick={btn.onClick}
        variant={"ghost"}
        className="font-semibold fc gap-2  justify-start flex"
      >
        <btn.icon className="h-4" />
        <span>{btn.text}</span>
      </Button>
    );
  };
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
        className="p-0 w-[250px] blr-plain fx-c gap-2  overflow-y-scroll"
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
        <div className="flex justify-start p-4 w-full  rounded-md bg-background   ">
          <div className="fx-c w-full">
            <Link href={"/"} className="w-full ">
              <LinkButton text="Home" icon={HomeIcon} />
            </Link>
            <Link href={"/search"} className="w-full ">
              <LinkButton text="Search" icon={Search} />
            </Link>

            <Link href={"/sellers"} className="w-full ">
              <LinkButton text="Sellers" icon={Store} />
            </Link>
            <Link href={"/contact"} className="w-full ">
              <LinkButton text="Contact" icon={Contact} />
            </Link>
          </div>
        </div>
        {user && (
          <div className="flex justify-start p-4 w-full rounded-md bg-background   ">
            <div className="fx-c">
              <Link href={"/profile"} className="w-full ">
                <LinkButton text="Profile & Orders" icon={User} />
              </Link>

              <Link href={"/saved-items"} className="w-full ">
                <LinkButton text="Saved Items" icon={Save} />
              </Link>
            </div>
          </div>
        )}
        {!user && (
          <div className="flex justify-start p-4 w-full rounded-md bg-background   ">
            <div className="w-full justify-start fx-c ">
              <LinkButton onClick={handleSignIn} text="Login" icon={LogIn} />
              <LinkButton
                text="Create Account"
                icon={User2}
                onClick={handleSignIn}
              />
            </div>
          </div>
        )}

        <div className="flex justify-start p-4 w-full rounded-md bg-background   ">
          <div className="fx-c w-full">
            <Link href={sell_url} className="w-full ">
              <LinkButton text="Sell" icon={Shirt} />
            </Link>
            <Link href={"/apply"} className="w-full ">
              <Button variant={"ghost"} className="font-semibold fc gap-2">
                <Shield className="h-4" />
                <span>
                  Apply For
                  <span className="uppercase px-1">{params.school}</span>
                  Admin
                </span>
              </Button>
            </Link>
            <Link href={schools_domain} className="w-full ">
              <LinkButton text="Schools" icon={School2} />
            </Link>
            {isInstallable && (
              <LinkButton
                text="Install Me"
                icon={Download}
                onClick={handleClick}
              />
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
