import Business from "@/models/Seller";
import { conn } from "@/models/mongo_db_connection";
import { ISellerBase } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await conn();
  const { pathname, origin } = req.nextUrl;
  try {
    const { name, phone, email, school, uid }: ISellerBase = await req.json();
    const newSeller = await Business.create({
      name: name,
      phone: phone,
      email: email,
      uid: uid,
      school: school,
    });
    return NextResponse.json({
      message: "Seller created successfully",
      success: true,
      data: newSeller,
    });
  } catch (e) {
    return NextResponse.json({
      message: "Error creating seller",
      success: false,
    });
  }
}
export async function GET() {
  await conn();
}
