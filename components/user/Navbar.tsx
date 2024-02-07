"use client";
import Link from "next/link";
import Image from "next/image";

import { usePathname, useRouter } from "next/navigation";
import { mobileLinks, navLinks } from "@/utils/data";

import { BiArrowBack } from "react-icons/bi";

import useScreen from "@/utils/hooks/useScreen";
import Button from "../utils/Button";
const NavBar = () => {
  const { scrolled } = useScreen();

  const pathname = usePathname();
  const router = useRouter();
  return (
    <header
      className={`w-screen px-[15px] md:px-[50px]  fb nav-h z-10  fixed top-0 left-0 ${
        scrolled ? "nav-glass" : "bg-background"
      }`}
    >
      <nav className="fb w-full z-[20]">
        {mobileLinks.find(({ link }) => link === pathname) ? (
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
        ) : (
          <button
            onClick={() => router.back()}
            className="flex flex-row items-center justify-start gap-[10px] text-button-3 "
          >
            <BiArrowBack className="w-6 h-6" />
            <span>Back</span>
          </button>
        )}

        <div className=" gap-4 fb-sm">
          {navLinks.map(({ link, title }) => (
            <Link
              href={link}
              key={link}
              className="link hover-text hover:no-underline"
            >
              {title}
            </Link>
          ))}
        </div>
        <div className="hidden md:fb gap-3  fb-sm">
          <Link href={`https://seller.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}>
            <Button title="Seller" containerStyles="outlined"></Button>
          </Link>

          {/* {user ? ( */}
          <Link href="/profile">
            <Button title="Profile" containerStyles="filled"></Button>
          </Link>
          {/* ) : ( */}
          <Link href="/login">
            <Button title="Login" containerStyles="filled"></Button>
          </Link>
          {/* )} */}
        </div>

        {/* <MobileMenu /> */}
      </nav>
    </header>
  );
};

export default NavBar;
