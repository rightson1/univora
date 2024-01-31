import Seller from "@/models/Seller";
import { conn } from "@/models/mongo_db_connection";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await conn();
  const admin = req.nextUrl.searchParams.get("uid");
  if (!admin) {
    return NextResponse.json({
      message: "Who are you?",
      success: false,
    });
  }
  try {
    const adminRaw = await Seller.findOne({ uid: admin });
    if (!adminRaw) {
      return NextResponse.json({
        message: "Who are you?",
        success: false,
      });
    }
    return NextResponse.json(adminRaw);
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      message: e,
      success: false,
    });
  }
}
