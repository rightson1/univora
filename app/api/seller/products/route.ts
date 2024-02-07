import Category from "@/models/Categories";
import Product from "@/models/Product";
import { conn } from "@/models/mongo_db_connection";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
  await conn();

  try {
    const productData = await req.json();
    const slugCount = await Product.countDocuments({
      slug: productData.slug,
    });
    if (slugCount > 1) {
      productData.slug = `${productData.slug}-${slugCount}`;
    }
    const product = await Product.create(productData);
    return NextResponse.json({
      message: "Product created successfully",
      success: true,
      data: product,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      message: "Error creating Product",
      success: false,
    });
  }
}
export async function GET(req: NextRequest) {
  await conn();
  try {
    const sellerId = req.nextUrl.searchParams.get("sellerId");
    Category;
    const products = await Product.find({
      business: sellerId,
    }).populate("category");
    return NextResponse.json(products);
  } catch (e) {
    return NextResponse.json({
      message: "Error fetching Products",
      success: false,
    });
  }
}
