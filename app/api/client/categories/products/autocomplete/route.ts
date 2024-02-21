import Category from "@/models/Categories";
import Product from "@/models/Product";
import School from "@/models/School";
import { conn } from "@/models/mongo_db_connection";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  await conn();
  try {
    const search = req.nextUrl.searchParams.get("search");
    const subdomain = req.nextUrl.searchParams.get("school");
    const category = req.nextUrl.searchParams.get("category");

    const school = await School.findOne({
      subdomain: subdomain,
    });

    if (!school || !category) {
      return NextResponse.json({
        success: false,
        message: "No school found",
      });
    }
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
      {
        $match: { school: school._id, category: new Types.ObjectId(category) },
      },
    ]);

    return NextResponse.json(products);
  } catch (e: any) {
    return NextResponse.json({
      message: e.message,
      success: false,
    });
  }
}
