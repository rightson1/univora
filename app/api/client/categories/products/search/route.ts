import Category from "@/models/Categories";
import Product from "@/models/Product";
import School from "@/models/School";
import { products_query } from "@/utils/pipelines/products";
import { conn } from "@/models/mongo_db_connection";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  await conn();
  try {
    const subdomain = req.nextUrl.searchParams.get("school");
    const category = req.nextUrl.searchParams.get("category");
    const search = req.nextUrl.searchParams.get("search");
    const page = Number(req.nextUrl.searchParams.get("page")) || 1;
    const limit = Number(req.nextUrl.searchParams.get("limit")) || 15;
    const skip = (page - 1) * limit;
    const school = await School.findOne({ subdomain });

    if (school && category) {
      const query = products_query(search);
      const products = await Product.aggregate([
        query,
        {
          $match: {
            school: school._id,
            category: new Types.ObjectId(category),
          },
        },
        { $skip: skip },
        { $limit: limit },
      ]);
      return NextResponse.json(products);
    } else {
      return NextResponse.json({
        message: "Error fetching Products",
        success: false,
      });
    }
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({
      message: e.message,
      success: false,
    });
  }
}
