import Category from "@/models/Categories";
import Product from "@/models/Product";
import School from "@/models/School";
import { conn } from "@/models/mongo_db_connection";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  await conn();
  try {
    const subdomain = req.nextUrl.searchParams.get("school");
    const page = Number(req.nextUrl.searchParams.get("page")) || 1;
    const limit = Number(req.nextUrl.searchParams.get("limit")) || 15;
    const skip = (page - 1) * limit;
    const school = await School.findOne({ subdomain });
    if (!school) {
      return NextResponse.json({
        message: "School not found",
        success: false,
      });
    }
    const products = await Product.aggregate([
      { $match: { school: school._id } },
      { $skip: skip },
      { $limit: limit },
    ]);
    return NextResponse.json(products);
  } catch (e: any) {
    return NextResponse.json({
      message: e.message,
      success: false,
    });
  }
}
