import { IVariant, IVariantFetched } from "@/types";

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

//function to filter out !active variants
export const fv = <T extends IVariantFetched | IVariant>(
  variants: T[]
): T[] => {
  return variants.filter((variant: T) => variant.active);
};
