import { School } from "lucide-react";
import Link from "next/link";
import React from "react";
import { CiShoppingCart as ShoppingBag } from "react-icons/ci";
import { CiMail as Mail } from "react-icons/ci";
import { CiHome as Home } from "react-icons/ci";
type linkProps = {
  link: string;
  icon: React.ReactNode;
  text: string;
};
export const User_Gen_Footer = () => {
  const LinkItem = ({ link, icon, text }: linkProps) => {
    return (
      <Link href={link} className="fc gap-4 hover:underline">
        {icon}
        <span className="text-black hover:text-indigo-500">{text}</span>
      </Link>
    );
  };
  return (
    <div className="py-5 ">
      <div className="p-[.2px] bg-black/10 w-full"></div>
      <div className="fc flex-wrap gap-5 pad-x py-2 mt-5">
        <LinkItem
          link={`http://seller.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
          icon={<ShoppingBag size={20} className="text-[.6rem] text-red-400" />}
          text="Sell"
        />
        <LinkItem
          link="https://api.whatsapp.com/send?phone=254778749554"
          icon={<Mail size={20} className="text-[.6rem] text-red-400" />}
          text="Contact"
        />
        {/* 
        <span className="text-center p-0">
          Made by{" "}
          <a
            target="_blank"
            href="https://rightson.vercel.app"
            className="underline text-indigo-500"
          >
            @chari designs
          </a>
        </span> */}
      </div>
    </div>
  );
};
