import { IFetched } from "./index";
import { IVariantFetched } from ".";

export interface IPcard {
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
  variants?: IVariantFetched[];
  imageSizes?: {
    width: number;
    height: number;
  };
  deleteProduct?: boolean;
  setBottom?: React.Dispatch<React.SetStateAction<boolean>>;
}
//intercae user
export interface IUser {
  uid: string;
  email: string;
  displayName: string;
  status: "active" | "inactive";
  school: string;
  phone?: string;
}
export interface IFUser {
  displayName: string;
  email: string;
  uid: string;
}
export interface IUserFetched extends IUser, IFetched {}
