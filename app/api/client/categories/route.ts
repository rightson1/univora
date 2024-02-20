import Category from "@/models/Categories";
import { conn } from "@/models/mongo_db_connection";
import { ICategory, ICategoryFetched } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await conn();
  const featured = req.nextUrl.searchParams.get("featured");
  if (featured) {
    const categories = await Category.find({ isFeatured: true });
    return NextResponse.json(categories);
  }
}
