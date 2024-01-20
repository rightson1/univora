import { MouseEventHandler } from "react";
import { Dispatch, SetStateAction } from "react";
export interface CustomButtonProps {
  isDisabled?: boolean;
  btnType?: "button" | "submit";
  containerStyles?: string;
  textStyles?: string;
  title: string;
  rightIcon?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}
export interface CustomInputProps {
  type: "text" | "password" | "email" | "number";
  sx?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export type MenuProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

//dialog props extende menu props
export type DialogProps = MenuProps & {
  children: React.ReactNode;
  notClosable?: boolean;
};
export type IChildren = {
  children: React.ReactNode;
};
export interface categoryCardProps {
  title: string;
  image: string;
}
export interface productCardProps {
  id: string;
  title: string;
  price: number;
  slug?: string;
  image: string;
  description: string;
  imageStyles?: string;
  containerStyles?: string;
  titleStyles?: string;
  priceStyles?: string;
  descriptionStyles?: string;
  titleContainerStyles?: string;
  button?: boolean;
  slice?: number | 40;
  imageSizes?: {
    width: number;
    height: number;
  };
  deleteProduct?: boolean;
}
export interface dealerCardProps {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface mobileMenuLinks {
  title: string;
  link: string;
}

export interface filterProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  category: string | null; // Updated type
  price: { min: number; max: number };
  setPrice: Dispatch<SetStateAction<{ min: number; max: number }>>;
  sort: string;
  setCategory: Dispatch<SetStateAction<string | null>>; // Updated type
  setSort: Dispatch<SetStateAction<string>>;
  setItems: Dispatch<SetStateAction<Product[]>>;
  items: Product[];
  brands: string[];
  allProducts: Product[];
}
export interface heroTypes {
  title: string;
  description: string;
}
export interface Category {
  _id: string;
  name: string;
  image: string;
  main: boolean;
  slug: string;
  businessId: string;
  subcategories: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface PageProps {
  params: {
    [key: string]: string;
  };
}
export interface CatchAllProps {
  params: {
    slug: string[];
  };
}
export interface Product {
  _id: string;
  categories: string[];
  description: string;
  discounted: number;
  brand: string;
  name: string;
  quantity?: string;
  regular: number;
  shortDescription: string;
  slug: string;
  gallery?: string[];
  productImage: string;
  tags: string[];
  outOfStock: boolean;
  businessId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  promoted: string[];
}
interface GenericComponentProps<T> {
  data: T;
}

export interface UserProfileProps {
  photoURL?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  coverImage: string;
  name: string;
  description?: string;
  phone?: string;
  id?: string;
  displayName: string;
  email: string;
  profileImage: string;
  shortDescription?: string;
}
export interface BusinessProps {
  products: Product[];
  business: UserProfileProps;
}
export interface SearchProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface SuggestionProps {
  _id: string;
  name: string;
  tag?: boolean;
  productImage?: string;
}

export type AutoCompleteProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  filtered: Product[];
};

export interface AutoCompleteSearchProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  isLoading: boolean;
  filtered: SuggestionProps[];
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface SlideShowProps {
  images: string[];
}
export interface UserProps {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  phone?: string;
}
export interface OrderProps {
  name: string;
  email: string;
  message?: string;
  phone?: string;
  business: string;
  item: string;
  total: number;
}
export interface OrderItemProps {
  _id: string;
  name: string;
  email: string;
  message: string;
  phone: string;
  status: string;
  business: string;
  item: Product;
  total: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface INavLinks {
  title: string;
  link: string;
}
export interface SelectTypes {
  items: string[];
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
  selectedItem: string;
  title: string;
}
export interface PromotedTypes {
  items: Product[];
  title: string;
  name: string;
  _id: string;
}
