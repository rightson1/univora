import { IProductFetched, IVariant, IVariantFetched } from "@/types";
import { toast } from "sonner";

export const ec = async (res: Response) => {
  try {
    const data = await res.json();
    if (data && data.success === false) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    // console.error(err);
  }
};
export function sTime(staleTimeInMinutes: number) {
  const staleTime = 1000 * 60 * staleTimeInMinutes;
  return {
    staleTime,
    initialDataUpdatedAt: Date.now() - staleTime,
  };
}
//check is array is not undefine of length is greater than 0
export const isArr = (arr: any[] | undefined) => {
  if (arr && arr.length > 0) {
    return true;
  }
  return false;
};
export const priceRange = (price: number, variants?: IVariantFetched[]) => {
  if (variants && isArr(variants)) {
    const prices = fv(variants).map((variant) => variant.price);
    const max = Math.max(...prices);
    const min = Math.min(...prices);
    if (min !== max && min !== 0 && max !== 0) {
      return `${min} - ${max}`;
    } else {
      return price;
    }
  } else {
    return price;
  }
};
export const pRange = (product: IProductFetched) => {
  return priceRange(product.price, product.variants);
};

//function to filter out !active variants
export const fv = <T extends IVariantFetched | IVariant>(
  variants: T[]
): T[] => {
  return variants.filter((variant: T) => variant.active);
};
//calculate total price of a product
export const totalPrice = (
  product: IProductFetched,
  variant?: IVariantFetched
) => {
  if (variant && variant?.price > 0) {
    return variant.price;
  } else {
    return product.price;
  }
};
//max quantity of a product
export const maxQuantity = (
  product: IProductFetched,
  variant?: IVariantFetched
): number => {
  if (variant && typeof variant.stock === "number" && variant.stock > 0) {
    return variant.stock;
  } else if (typeof product.stock === "number") {
    return product.stock;
  } else {
    throw new Error("Stock is not a number");
  }
};

//confirem product.productType is product
export const isProduct = (product: IProductFetched) => {
  return product.productType === "product";
};
//product quantit
export const pQty = (product: IProductFetched, variant?: IVariantFetched) => {
  const max = maxQuantity(product, variant);
  if (max < 0) {
    return "Out of stock";
  } else {
    return max;
  }
};
export const sonner = toast;
