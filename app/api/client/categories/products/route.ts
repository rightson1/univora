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
    const category_slug = req.nextUrl.searchParams.get("category");

    const school = await School.findOne({ subdomain });

    const category = await Category.findOne({ slug: category_slug });
    if (school && category) {
      const products = await Product.find({
        school: school._id,
        category: category._id,
      });
      return NextResponse.json(products);
    }
  } catch (e) {
    return NextResponse.json({
      message: "Error fetching Products",
      success: false,
    });
  }
}
