import Product from "@/models/Product";
import { conn } from "@/models/mongo_db_connection";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await conn();
  try {
    const productData = await req.json();
    //count number of products with same slug, if more than one, add a number to the slug
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
    return NextResponse.json({
      message: "Error creating Product",
      success: false,
    });
  }
}
export async function GET() {
  await conn();
}
