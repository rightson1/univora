import Category from "@/models/Categories";
import Product from "@/models/Product";
import { conn } from "@/models/mongo_db_connection";
import { verifyIdToken } from "@/utils/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
  try {
    await conn();
    await verifyIdToken(req);
    const productData = await req.json();

    const slugCount = await Product.countDocuments({
      slug: productData.slug,
    });
    if (slugCount >= 1) {
      productData.slug = `${productData.slug}-${
        Math.floor(Math.random() * 1000) + 1
      }`;
    }
    // console.log(productData, "productData");
    const product = await Product.create(productData);
    return NextResponse.json(product);
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({
      message: e.message,
      success: false,
    });
  }
}
export async function GET(req: NextRequest) {
  try {
    await conn();
    await verifyIdToken(req);
    const sellerId = req.nextUrl.searchParams.get("sellerId");
    Category;
    const products = await Product.find({
      business: sellerId,
    })
      .populate("category")
      .sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch (e) {
    return NextResponse.json({
      message: "Error fetching Products",
      success: false,
    });
  }
}
