import { getS, published, toObj } from "@/app/api/utils/funcs";
import Category from "@/models/Categories";
import Product from "@/models/Product";
import School from "@/models/School";
import { conn } from "@/models/mongo_db_connection";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  await conn();
  try {
    const search = req.nextUrl.searchParams.get("search");
    const schoolId = toObj(await getS(req));
    const query = {
      $search: {
        index: "products",
        autocomplete: {
          query: search,
          path: "name",
          fuzzy: {
            maxEdits: 2,
            prefixLength: 3,
          },
        },
      },
    };

    const products = await Product.aggregate([
      query,
      { $match: { school: schoolId, ...published } },
    ]);

    return NextResponse.json(products);
  } catch (e: any) {
    return NextResponse.json({
      message: e.message,
      success: false,
    });
  }
}
