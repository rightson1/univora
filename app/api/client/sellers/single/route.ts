import Seller from "@/models/Seller";
import School from "@/models/School";
import { conn } from "@/models/mongo_db_connection";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  await conn();
  try {
    const seller_slug_or_id = req.nextUrl.searchParams.get("seller");

    const seller = await Seller.findOne({ slug: seller_slug_or_id });

    return NextResponse.json(seller);
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      message: "Error fetching Sellers",
      success: false,
    });
  }
}
