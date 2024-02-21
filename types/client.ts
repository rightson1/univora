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
  imageSizes?: {
    width: number;
    height: number;
  };
  deleteProduct?: boolean;
  setBottom?: React.Dispatch<React.SetStateAction<boolean>>;
}
