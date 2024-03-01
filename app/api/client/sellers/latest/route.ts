import Seller from "@/models/Seller";
import School from "@/models/School";
import { conn } from "@/models/mongo_db_connection";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  await conn();
  try {
    const subdomain = req.nextUrl.searchParams.get("school");
    const school = await School.findOne({
      subdomain,
    });
    //fetch new added 10 sellers
    const sellers = await Seller.find({ school: school?._id })
      .sort({ createdAt: 1 })
      .limit(10);
    return NextResponse.json(sellers);
  } catch (e) {
    return NextResponse.json({
      message: "Error fetching Sellers",
      success: false,
    });
  }
}
