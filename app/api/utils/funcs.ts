import School from "@/models/School";
import { IProductFetched } from "@/types";
import { fv } from "@/utils/helpers";
import { Types } from "mongoose";
import { NextRequest } from "next/server";

export async function getS(req: NextRequest): Promise<string> {
  const school_id = req.cookies.get("school_id")?.value || "";

  const subdomain =
    req.nextUrl.searchParams.get("school") ||
    req.nextUrl.searchParams.get("subdomain");

  if (school_id) {
    return school_id;
  } else {
    const school = await School.findOne({ subdomain });
    if (!school) {
      throw new Error("School not found");
    }
    return school._id;
  }
}
export const toObj = (str: string) => {
  return new Types.ObjectId(str);
};
export function vArr<T>(value: T[] | T | undefined): value is T[] {
  if (typeof value === "undefined") {
    return false;
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return false;
}

//check is product variants exists
export const hasVariants = (product: IProductFetched) => {
  return fv(product.variants).length > 0;
};
export const published = {
  status: "published",
};
