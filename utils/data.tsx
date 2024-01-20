import { INavLinks } from "@/types";
import { IProductTable } from "@/types/sellerTypes";

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
