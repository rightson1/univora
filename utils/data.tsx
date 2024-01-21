import { INavLinks } from "@/types";
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

export const navLinks: INavLinks[] = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Categories",
    link: "/categories",
  },
  {
    title: "Dealers",
    link: "/dealers",
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
    title: "Dealers",
    link: "/dealers",
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

const randomImage = () => images[Math.floor(Math.random() * images.length)];
export const productsTable: IProductTable[] = [
  {
    id: "m5gr84i9",
    name: "T-Shirt",
    thumbnail: randomImage(),
    category: "Clothing",
    status: "published",
    inventory: "1 in stock for variant(Color: Red, Size: M)",
    actions: "all",
  },
  {
    id: "m5gr84i10",
    name: "Jeans",
    thumbnail: randomImage(),
    category: "Clothing",
    status: "published",
    inventory: "5 in stock for variant(Color: Blue, Size: L)",
    actions: "all",
  },
  {
    id: "m5gr84i11",
    name: "Sweater",
    thumbnail: randomImage(),
    category: "Clothing",
    status: "published",
    inventory: "3 in stock for variant(Color: Green, Size: S)",
    actions: "all",
  },
  {
    id: "m5gr84i12",
    name: "Jacket",
    thumbnail: randomImage(),
    category: "Clothing",
    status: "published",
    inventory: "4 in stock for variant(Color: Black, Size: M)",
    actions: "all",
  },
  {
    id: "m5gr84i13",
    name: "Shoes",
    thumbnail: randomImage(),
    category: "Footwear",
    status: "published",
    inventory: "6 in stock for variant(Color: White, Size: 8)",
    actions: "all",
  },
  {
    id: "m5gr84i14",
    name: "Socks",
    thumbnail: randomImage(),
    category: "Footwear",
    status: "published",
    inventory: "10 in stock for variant(Color: Gray, Size: Free Size)",
    actions: "all",
  },
  {
    id: "m5gr84i15",
    name: "Hat",
    thumbnail: randomImage(),
    category: "Accessories",
    status: "published",
    inventory: "7 in stock for variant(Color: Brown, Size: Free Size)",
    actions: "all",
  },
  {
    id: "m5gr84i16",
    name: "Scarf",
    thumbnail: randomImage(),
    category: "Accessories",
    status: "published",
    inventory: "8 in stock for variant(Color: Red, Size: Free Size)",
    actions: "all",
  },
  {
    id: "m5gr84i17",
    name: "Gloves",
    thumbnail: randomImage(),
    category: "Accessories",
    status: "published",
    inventory: "2 in stock for variant(Color: Black, Size: Free Size)",
    actions: "all",
  },
  {
    id: "m5gr84i18",
    name: "Belt",
    thumbnail: randomImage(),
    category: "Accessories",
    status: "published",
    inventory: "9 in stock for variant(Color: Brown, Size: M)",
    actions: "all",
  },
  {
    id: "m5gr84i19",
    name: "Sunglasses",
    thumbnail: randomImage(),

    category: "Accessories",
    status: "published",
    inventory: "0 in stock for variant(Color: Black, Size: Free Size)",

    actions: "all",
  },
];

export const businesses: TBusiness[] = [
  {
    id: "1",
    name: "Business 1",
    email: "business1@example.com",
    profileImage: randomImage(),
    status: "approved",
    visibility: "public",
    actions: "",
  },
  {
    id: "2",
    name: "Business 2",
    email: "business2@example.com",
    profileImage: randomImage(),
    status: "pending",
    visibility: "private",
    actions: "",
  },
  {
    id: "3",
    name: "Business 3",
    email: "business3@example.com",
    profileImage: randomImage(),
    status: "banned",
    visibility: "public",
    actions: "",
  },
  {
    id: "4",
    name: "Business 4",
    email: "business4@example.com",
    profileImage: randomImage(),
    status: "approved",
    visibility: "private",
    actions: "",
  },
  {
    id: "5",
    name: "Business 5",
    email: "business5@example.com",
    profileImage: randomImage(),
    status: "pending",
    visibility: "public",
    actions: "",
  },
  {
    id: "6",
    name: "Business 6",
    email: "business6@example.com",
    profileImage: randomImage(),
    status: "banned",
    visibility: "private",
    actions: "",
  },
  {
    id: "7",
    name: "Business 7",
    email: "business7@example.com",
    profileImage: randomImage(),
    status: "approved",
    visibility: "public",
    actions: "",
  },
  {
    id: "8",
    name: "Business 8",
    email: "business8@example.com",
    profileImage: randomImage(),
    status: "pending",
    visibility: "private",
    actions: "",
  },
  {
    id: "9",
    name: "Business 9",
    email: "business9@example.com",
    profileImage: randomImage(),
    status: "banned",
    visibility: "public",
    actions: "",
  },
  {
    id: "10",
    name: "Business 10",
    email: "business10@example.com",
    profileImage: randomImage(),
    status: "approved",
    visibility: "private",
    actions: "",
  },
];

const fulfillments: IOrderTable["fulfillment"][] = [
  "fulfilled",
  "unfulfilled",
  "partial",
];
const payments: IOrderTable["payment"][] = ["paid", "unpaid", "partial"];

export const orders: IOrderTable[] = [
  {
    id: "1",
    customer: "Customer 1",
    date: "2022-01-01",
    fulfillment: fulfillments[0],
    payment: payments[0],
    total: "100.00",
  },
  {
    id: "2",
    customer: "Customer 2",
    date: "2022-01-02",
    fulfillment: fulfillments[1],
    payment: payments[1],
    total: "200.00",
  },
  {
    id: "3",
    customer: "Customer 3",
    date: "2022-01-03",
    fulfillment: fulfillments[2],
    payment: payments[2],
    total: "300.00",
  },
  {
    id: "4",
    customer: "Customer 4",
    date: "2022-01-04",
    fulfillment: fulfillments[0],
    payment: payments[0],
    total: "400.00",
  },
  {
    id: "5",
    customer: "Customer 5",
    date: "2022-01-05",
    fulfillment: fulfillments[1],
    payment: payments[1],
    total: "500.00",
  },
  {
    id: "6",
    customer: "Customer 6",
    date: "2022-01-06",
    fulfillment: fulfillments[2],
    payment: payments[2],
    total: "600.00",
  },
  {
    id: "7",
    customer: "Customer 7",
    date: "2022-01-07",
    fulfillment: fulfillments[0],
    payment: payments[0],
    total: "700.00",
  },
  {
    id: "8",
    customer: "Customer 8",
    date: "2022-01-08",
    fulfillment: fulfillments[1],
    payment: payments[1],
    total: "800.00",
  },
  {
    id: "9",
    customer: "Customer 9",
    date: "2022-01-09",
    fulfillment: fulfillments[2],
    payment: payments[2],
    total: "900.00",
  },
  {
    id: "10",
    customer: "Customer 10",
    date: "2022-01-10",
    fulfillment: fulfillments[0],
    payment: payments[0],
    total: "1000.00",
  },
];
export const orderStatus = [
  {
    value: "fulfilled",
    label: "Completed",
    icon: CheckCircledIcon,
  },
  {
    value: "partial",
    label: "Partial",
    icon: CircleIcon,
  },
  {
    value: "unfulfilled",
    label: "Unfulfilled",
    icon: StopwatchIcon,
  },
];

export const paymentStatus = [
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
    value: "unpaid",
    label: "Unpaid",
    icon: StopwatchIcon,
  },
];
