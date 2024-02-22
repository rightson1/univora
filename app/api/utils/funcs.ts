import School from "@/models/School";
import { Types } from "mongoose";
import { NextRequest } from "next/server";

export async function getS(req: NextRequest): Promise<string> {
  const school_id = req.cookies.get("school_id")?.value || "";
  const subdomain =
    req.nextUrl.searchParams.get("school") ||
    req.nextUrl.searchParams.get("subdomain");
  try {
    if (school_id) {
      return school_id;
    } else {
      const school = await School.findOne({ subdomain });
      if (!school) {
        throw new Error("School not found");
      }
      return school._id;
    }
  } catch (e) {
    throw new Error("Token is invalid or expired. Please login again.");
  }
}
export const toObj = (str: string) => {
  return new Types.ObjectId(str);
};
