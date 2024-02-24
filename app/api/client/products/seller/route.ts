import { getS } from "@/app/api/utils/funcs";
import Product from "@/models/Product";
import Seller from "@/models/Seller";

import { conn } from "@/models/mongo_db_connection";
import { ISellerFetched } from "@/types";

import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  await conn();
  try {
    const s = req.nextUrl.searchParams.get("seller");
    const seller: ISellerFetched | null = await Seller.findOne({ slug: s });
    if (!seller) {
      return NextResponse.json({
        message: "Seller not found",
        success: false,
      });
    }
    console.log(seller);
    const products = await Product.find({
      business: seller._id,
    }).sort({
      createdAt: -1,
    });
    return NextResponse.json(products);
  } catch (e: any) {
    return NextResponse.json({
      message: e.message,
      success: false,
    });
  }
}
