import { published } from "./../../../utils/funcs";
import { getS, toObj } from "@/app/api/utils/funcs";
import Product from "@/models/Product";
import { conn } from "@/models/mongo_db_connection";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  await conn();
  try {
    const page = Number(req.nextUrl.searchParams.get("page")) || 1;
    const limit = Number(req.nextUrl.searchParams.get("limit")) || 15;
    const skip = (page - 1) * limit;
    const school = toObj(await getS(req));

    if (!school) {
      return NextResponse.json({
        message: "School not found",
        success: false,
      });
    }
    const products = await Product.aggregate([
      { $match: { school: school, ...published } },
      { $skip: skip },
      { $limit: limit },
    ]);
    return NextResponse.json(products);
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({
      message: e.message,
      success: false,
    });
  }
}
