import Admin from "@/models/Admin";
import { conn } from "@/models/mongo_db_connection";
import { IAdmin, ISAdmin } from "@/types";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
  await conn();

  try {
    const adminRaw: IAdmin & { pass: string } = await req.json();

    if (adminRaw.pass !== process.env.ADMIN_PASS ?? "") {
      return NextResponse.json({
        message: "Who are you?",
        success: false,
      });
    }

    const count = await Admin.countDocuments({ schoolId: adminRaw.school });
    if (count >= 2) {
      return NextResponse.json({
        message: "Too many admins",
        success: false,
      });
    }
    const admin = new Admin(adminRaw);
    await admin.save();
    return NextResponse.json({
      message: "Success",
      success: true,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      message: e,
      success: false,
    });
  }
}
//get admin by uid
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
    const adminRaw = await Admin.findOne({ uid: admin });
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
