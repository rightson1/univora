import Seller from "@/models/Seller";
import School from "@/models/School";
import { conn } from "@/models/mongo_db_connection";
import { NextRequest, NextResponse } from "next/server";
import { getS } from "../../utils/funcs";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  await conn();
  try {
    const school = await getS(req);
    const sellers = await Seller.find({
      school: school,
    })
      .sort({ createdAt: -1 })
      .limit(10);
    return NextResponse.json(sellers);
  } catch (e: any) {
    return NextResponse.json({
      message: e.message,
      success: false,
    });
  }
}
