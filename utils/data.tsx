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

const root_domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
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
    title: "Sellers",
    link: "/sellers",
  },
  {
    title: "Categories",
    link: "/categories",
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
  // title: "Empowering Student Entrepreneurs",
  title: "UNDER CONSTRUCTION",
  description: `Oya, buy from a comrade asilale njaa
   ,ama we  ni entrepreneur? or 
  unataka tu za cabbage , lets sale you phone.Anyways,
  Univora connects you 
     with customers within your school.
       Plus, we offer a special point of sale for you.
  Manage your inventory,sales  and finances with ease.`,
};
export const client_hero = {
  title: "Empowering Student Entrepreneurs",
  description: `
  Are you an entrepreneur or a nail artist like me?
   Univora connects you with customers around your school.
    Start selling by clicking on 'Sell' in the footer.
     Plus, we offer a special point of sale for you. 
     No need to wait for market days.
      Showcase your skills and products now for free. 
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
