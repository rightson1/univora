import Admin from "@/models/Admin";
import School from "@/models/School";
import { conn } from "@/models/mongo_db_connection";
import { IAdmin, ISAdmin } from "@/types";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  await conn();
  School;
  const admins = await Admin.find().populate("school");
  return NextResponse.json(admins);
}

//edit admin
export async function PUT(req: NextRequest) {
  await conn();
  const { _id, ...data } = await req.json();
  const admin = await Admin.findByIdAndUpdate(_id, data, {
    new: true,
  }).populate("school");
  return NextResponse.json(admin);
}
