"use client";
import Link from "next/link";
import Image from "next/image";

import { usePathname, useRouter } from "next/navigation";
import { mobileLinks, navLinks, sell_url } from "@/utils/data";

import { BiArrowBack } from "react-icons/bi";

import useScreen from "@/utils/hooks/useScreen";
import { MobileMenu } from "@/components/client/MobileMenu";
import { useUser } from "@/utils/userAuth";
import { Button } from "../ui/button";
const NavBar = () => {
  const { scrolled } = useScreen();
  const { user, handleSignIn } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  return (
    <header
      className={`${
        scrolled ? "nav-glass" : "bg-background"
      } border-t-0 w-screen px-[15px] md:px-[50px]  fb nav-h z-10  fixed top-0 left-0
       `}
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
          <Link href={sell_url}>
            <Button variant={"outline"} className="rounded-full bg-transparent">
              Sell
            </Button>
          </Link>
          {user && (
            <Link href={`/profile`}>
              <Button className="rounded-full">
                Hi, {user?.displayName.split(" ")[0]}
              </Button>
            </Link>
          )}

          {!user && (
            <Button
              onClick={handleSignIn}
              variant={"outline"}
              className="rounded-full bg-transparent"
            >
              Login
            </Button>
          )}
          {!user && (
            <Button onClick={handleSignIn} className="rounded-full">
              Sign Up
            </Button>
          )}
        </div>

        <div className="flex md:hidden">
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
