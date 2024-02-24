"use client";
import Link from "next/link";
import Image from "next/image";

import { usePathname, useRouter } from "next/navigation";
import { mobileLinks, navLinks } from "@/utils/data";

import { BiArrowBack } from "react-icons/bi";

import useScreen from "@/utils/hooks/useScreen";
import Button from "../utils/Button";
import { MobileMenu } from "@/components/user/MobileMenu";
export const User_General_Nav = () => {
  const { scrolled } = useScreen();

  return (
    <header
      className={`w-screen px-[15px] md:px-[50px]  fb nav-h z-10  fixed top-0 left-0 ${
        scrolled ? "nav-glass" : "bg-background"
      }`}
    >
      <nav className="fb w-full z-[20]">
        <Link
          href="/"
          className="flex flex-row items-center justify-start gap-[10px] text-button-3"
        >
          <Image
            width={100}
            height={100}
            className="logo "
            src="/logo.svg"
            alt="Univora Logo"
          />
        </Link>

        <div className=" gap-4 fb-sm">
          <Link href={"/"} className="link hover-text hover:no-underline">
            Home
          </Link>

          <Link
            href={"/contact"}
            className="link hover-text hover:no-underline"
          >
            Contact
          </Link>
        </div>
        <div className="hidden md:fb gap-3  fb-sm">
          <Link href={`https://seller.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}>
            <Button title="My Shop" containerStyles="filled"></Button>
          </Link>
        </div>

        <MobileMenu />
      </nav>
    </header>
  );
};
