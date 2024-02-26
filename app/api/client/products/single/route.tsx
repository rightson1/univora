import { published } from "@/app/api/utils/funcs";
import Product from "@/models/Product";
import Seller from "@/models/Seller";
import { conn } from "@/models/mongo_db_connection";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  await conn();
  try {
    const slug = req.nextUrl.searchParams.get("slug");
    Seller;
    const product = await Product.findOne({
      slug: slug,
      ...published,
    }).populate("business school");
    if (product) {
      return NextResponse.json(product);
    } else {
      return NextResponse.json({
        message: "Product not found",
        success: false,
      });
    }
  } catch (e) {
    return NextResponse.json({
      message: "Error fetching Products",
      success: false,
    });
  }
}
