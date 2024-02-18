import Product from "@/models/Product";
import { conn } from "@/models/mongo_db_connection";

import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  await conn();
  const seller = req.nextUrl.searchParams.get("seller");
  const products = await Product.find({
    business: seller,
  });
  return NextResponse.json(products);
}
