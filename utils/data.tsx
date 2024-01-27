import { ICategory, INavLinks, ISchoolTable } from "@/types";
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

export const universitiesTable: ISchoolTable[] = [
  {
    id: "1",
    name: "University of Nairobi",
    subdomain: "uon",
    county: "Nairobi",
    admin: "Admin1",
  },
  {
    id: "2",
    name: "Kenyatta University",
    subdomain: "ku",
    county: "Kiambu",
    admin: "Admin2",
  },
  {
    id: "3",
    name: "Moi University",
    subdomain: "mu",
    county: "Uasin Gishu",
    admin: "Admin3",
  },
  {
    id: "4",
    name: "Egerton University",
    subdomain: "eu",
    county: "Nakuru",
    admin: "Admin4",
  },
  {
    id: "5",
    name: "Jomo Kenyatta University of Agriculture and Technology",
    subdomain: "jkuat",
    county: "Kiambu",
    admin: "Admin5",
  },
  {
    id: "6",
    name: "Maseno University",
    subdomain: "maseno",
    county: "Kisumu",
    admin: "Admin6",
  },
  {
    id: "7",
    name: "Masinde Muliro University of Science and Technology",
    subdomain: "mmust",
    county: "Kakamega",
    admin: "Admin7",
  },
  {
    id: "8",
    name: "Technical University of Kenya",
    subdomain: "tuk",
    county: "Nairobi",
    admin: "Admin8",
  },
  {
    id: "9",
    name: "Strathmore University",
    subdomain: "strathmore",
    county: "Nairobi",
    admin: "Admin9",
  },
  {
    id: "10",
    name: "United States International University Africa",
    subdomain: "usiu",
    county: "Nairobi",
    admin: "Admin10",
  },
];
export const dummyCategories: ICategory[] = [
  {
    id: "1",
    name: "Electronics",
    description: "Devices, gadgets and accessories",
    status: true,
    parentCategoryId: "",
    rank: 1,
    children: [
      {
        id: "2",
        name: "Phones",
        description: "Infinix, tecno",
        status: true,
        children: [
          {
            id: "11",
            name: "Smartphones",
            description: "Samsung, Apple",
            status: true,
            children: [
              {
                id: "12",
                name: "Samsung",
                description: "Samsung",
                status: true,
                children: [],
                parentCategoryId: "11",
                rank: 0,
              },
              {
                id: "13",
                name: "Apple",
                description: "Apple",
                status: true,
                children: [],
                parentCategoryId: "11",
                rank: 1,
              },
            ],
            parentCategoryId: "2",
            rank: 0,
          },
        ],
        parentCategoryId: "1",
        rank: 0,
      },
      {
        id: "3",
        name: "Laptops",
        description: "Dell, HP",
        status: true,
        children: [
          {
            id: "4",
            name: "Gaming Laptops",
            description: "ASUS, Acer",
            status: true,
            children: [],
            parentCategoryId: "3",
            rank: 0,
          },
          {
            id: "8",
            name: "Business Laptops",
            description: "Lenovo ThinkPad, Dell Latitude, HP EliteBook",
            status: true,
            children: [],
            parentCategoryId: "3",
            rank: 1,
          },
          {
            id: "9",
            name: "Chromebooks",
            description:
              "Acer Chromebook Spin 713, Asus Chromebook Flip CX5, Samsung Galaxy Chromebook 2",
            status: true,
            children: [],
            parentCategoryId: "3",
            rank: 2,
          },
          {
            id: "10",
            name: "Budget Laptops",
            description: "HP Stream, Lenovo IdeaPad 3, Asus VivoBook Flip 14",
            status: true,
            children: [],
            parentCategoryId: "3",
            rank: 3,
          },
        ],
        parentCategoryId: "1",
        rank: 1,
      },
    ],
  },

  {
    id: "5",
    name: "Clothing",
    description: "Apparel and fashion items",
    status: true,
    parentCategoryId: "",
    rank: 2,
    children: [
      {
        id: "6",
        name: "Men's Clothing",
        description: "Shirts, pants",
        status: true,
        children: [],
        parentCategoryId: "5",
        rank: 0,
      },
      {
        id: "18",
        name: "Casual Wear",
        description:
          "Relax and look effortlessly stylish with our collection of T-shirts, jeans, sweaters, and sneakers.",
        status: true,
        parentCategoryId: "5",
        rank: 3,
        children: [],
      },
      {
        id: "19",
        name: "Formal Wear",
        description:
          "Make a lasting impression with our curated selection of dresses, suits, shirts, blazers, and heels.",
        status: true,
        parentCategoryId: "5",
        rank: 4,
        children: [],
      },
      {
        id: "20",
        name: "Activewear",
        description:
          "Stay comfortable and motivated with our performance-driven activewear, perfect for workouts and everyday activities.",
        status: true,
        parentCategoryId: "5",
        rank: 5,
        children: [],
      },
    ],
  },

  // ... 4 more top-level or subcategories can be added here, each with children
];
