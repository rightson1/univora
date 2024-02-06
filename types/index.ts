import { ChangeEvent, MouseEventHandler } from "react";
import { Dispatch, SetStateAction } from "react";
import { TOption } from "./sellerTypes";
export interface CustomButtonProps {
  isDisabled?: boolean;
  btnType?: "button" | "submit";
  containerStyles?: string;
  textStyles?: string;
  title: string;
  rightIcon?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
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

export interface mobileMenuLinks {
  title: string;
  link: string;
}

export interface heroTypes {
  title: string;
  description: string;
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

export interface SuggestionProps {
  _id: string;
  name: string;
  tag?: boolean;
  productImage?: string;
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

export interface ISchoolTable {
  id: string;
  name: string;
  subdomain: string;
  county: string;
  admin: string;
}
export interface IFetched {
  _id: string;
  createdAt: string;
  updatedAt: string;
}
export type TSchoolStatus = "active" | "paused";
export interface ICategoryTable {
  id: string;
  name: string;
  description: string;
  status: boolean;
  parentCategoryId: string;
  rank: number;
  children: ICategoryTable[];
}
export interface IAdminBase {
  displayName: string;
  email: string;
  phone?: string;
  role: string;
  photoURL?: string;
  uid: string;
}
export interface ISAdmin extends IAdminBase {
  createdAt: string;
  updatedAt: string;
}
export interface IAdmin extends IAdminBase {
  schoolId: string;
  pass?: string;
}
export interface IAdminFetched extends IAdmin, IFetched {}
export interface ISchool {
  name: string;
  subdomain: string;
  // location: string;
  status: TSchoolStatus;
}
export interface ISchoolFetched extends IFetched, ISchool {}
export interface ICategory {
  name: string;
  parent?: string | ICategoryFetched;
  children: string[] | ICategoryFetched[];
  slug: string;
  description?: string;
  image?: string;
  isFeatured: boolean;
  isActive: boolean;
  sortingPriority?: number;
}

export interface ICategoryFetched extends IFetched, ICategory {
  parent?: ICategoryFetched;
  children: ICategoryFetched[];
}
export type InputChangeEventTypes =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

interface WithId {
  _id: string;
}

export type TEdit<T> = Partial<T> & WithId;

export interface ISellerBase {
  name: string;
  email: string;
  phone: string;
  school: string;
  uid: string;
}
export interface ISeller extends ISellerBase, IFetched {}
export interface IAuthUser {
  email: string;
  displayName?: string;
  photoURL?: string;
  uid: string;
}

export interface IVariant {
  options: string;
  price: number;
  active: boolean;
}
export interface IProductBase {
  business: string;
  name: string;
  price: number;
  description?: string;
  longDescription?: string;

  stock?: number;
  tags: string[];
  brand?: string;
  thumbnail: string;
  media: string[];
  active: boolean;
  productType: IProductType;
  options?: TOption[];
  slug: string;
  variants?: IVariant[];
}
export interface IProduct extends IProductBase {
  category: string;
}
export type IProductType = "product" | "service";
export interface IProductValues {
  values: Pick<
    IProduct,
    | "category"
    | "name"
    | "price"
    | "description"
    | "stock"
    | "tags"
    | "brand"
    | "productType"
  >;
  setValues: Dispatch<SetStateAction<IProductValues["values"]>>;
  handleChange: (e: ChangeEvent<InputChangeEventTypes>) => void;
}
export interface IProductFetched extends IProductBase, IFetched {
  category: ICategoryFetched;
}
