import School from "@/models/School";
import Seller from "@/models/Seller";
import { conn } from "@/models/mongo_db_connection";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await conn();
  const admin = req.nextUrl.searchParams.get("uid");
  const email = req.nextUrl.searchParams.get("email");

  if (!admin && !email) {
    return NextResponse.json({
      message: "Who are you?",
      success: false,
    });
  }
  try {
    const query = admin ? { uid: admin } : { email };
    School;
    const adminRaw = await Seller.findOne(query).populate("school");
    if (!adminRaw) {
      return NextResponse.json({
        message: `Kwa sasa huna akaunti nduguyangu,unda alafu urudi tuuze hii simu`,
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
