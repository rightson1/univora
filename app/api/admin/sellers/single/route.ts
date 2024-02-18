import Seller from "@/models/Seller";
import { conn } from "@/models/mongo_db_connection";
import { ISeller, ISellerBase, ISellerFetched } from "@/types";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  await conn();
  const _id = req.nextUrl.searchParams.get("_id");
  const seller = await Seller.findById(_id);
  return NextResponse.json(seller);
}
