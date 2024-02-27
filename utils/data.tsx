import {
  ICategoryTable,
  INavLinks,
  ISchoolTable,
  ISocialLink,
  TOrderStatus,
  TPaymentStatus,
} from "@/types";
import { IOrderTable, IProductTable, TBusiness } from "@/types/sellerTypes";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa6";

export const root_domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
export const protocal = process.env.NEXT_PUBLIC_PROTOCAL || "https";
export const baseUrl: string =
  process.env.NODE_ENV === "development"
    ? `${protocal}://${root_domain}`
    : `${protocal}://${root_domain}`;
export const navLinks: INavLinks[] = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Search",
    link: "/search",
  },
  {
    title: "Sellers",
    link: "/sellers",
  },

  {
    title: "Saved Items",
    link: "/saved-items",
  },
];
export const mobileLinks = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Search",
    link: "/search",
  },
  {
    title: "Categories",
    link: "/categories",
  },
  {
    title: "Sellers",
    link: "/sellers",
  },
  {
    title: "Saved Items",
    link: "/saved-items",
  },
];
const images = [
  "/login/headphones.jpg",
  "/login/makeup.jpg",
  "/login/smartwatch.jpg",
  "/login/sneakers.jpg",
];

export const orderStatus: {
  value: TOrderStatus;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    value: "completed",
    label: "Completed",
    icon: CheckCircledIcon,
  },
  {
    value: "confirmed",
    label: "Partial",
    icon: CircleIcon,
  },
  {
    value: "pending",
    label: "Pending",
    icon: StopwatchIcon,
  },
  {
    value: "cancelled",
    label: "Cancelled",
    icon: CrossCircledIcon,
  },
];

export const paymentStatus: {
  value: TPaymentStatus;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    value: "paid",
    label: "Paid",
    icon: CheckCircledIcon,
  },
  {
    value: "partial",
    label: "Partial",
    icon: CircleIcon,
  },
  {
    value: "pending",
    label: "Unpaid",
    icon: StopwatchIcon,
  },
];
export const hero = {
  title: "Empowering Student Entrepreneurs",

  description: `
  Are you an entrepreneur or you just need quick cash?
Univora lets you sell your products and services to students around your school.
    Start by selecting your and lets get to buy or sell.
     I forgot to mention, 
     we offer a special point of sale for you. You easily manage 
     you sales and inventory.
     . 
  `,
};
export const client_hero = {
  title: "Empowering Student Entrepreneurs",
  description: `
   Are you an entrepreneur or you just need quick cash?
Univora lets you sell your products and services to students around your school.
    Start by selecting your and lets get to buy or sell.
     We offer a special point of sale for you. You easily manage 
     you sales and inventory.
  `,
};
export const platformIcons: {
  title: ISocialLink["platform"];
  icon: React.ComponentType<{ className?: string }>;
  link?: string;
}[] = [
  {
    title: "instagram",
    icon: FaInstagram,
    link: "https://instagram.com",
  },
  //tiktok
  {
    title: "tiktok",
    icon: FaTiktok,
    link: "https://tiktok.com",
  },
  {
    title: "whatsapp",
    icon: FaWhatsapp,
    link: "https://wa.me",
  },
];
export const sell_url = `http://seller.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
export const admin_email =
  process.env.NEXT_PUBLIC_ADMIN_EMAIL || "chari.rightson@gmail.com";
export const schools_domain = `${protocal}://${process.env.NEXT_PUBLIC_ROOT_DOMAIN}?noredirect=true`;
