import Seller from "@/models/Seller";
import { conn } from "@/models/mongo_db_connection";
import { ISeller, ISellerBase, ISellerFetched } from "@/types";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  await conn();
  const school = req.nextUrl.searchParams.get("school");
  const sellers = await Seller.find({
    school,
  });

  return NextResponse.json(sellers);
}

export async function PUT(req: NextRequest) {
  await conn();

  const { _id, status } = (await req.json()) as ISellerFetched;

  const seller = await Seller.findById(_id);
  seller.status = status;
  await seller.save();
  return NextResponse.json(seller);
}
