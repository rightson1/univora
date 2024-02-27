import Category from "@/models/Categories";
import { conn } from "@/models/mongo_db_connection";
import { ICategory, ICategoryFetched } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { published } from "../../utils/funcs";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  await conn();
  const featured = req.nextUrl.searchParams.get("featured");
  const category_slug = req.nextUrl.searchParams.get("category_slug");
  const slug = req.nextUrl.searchParams.get("slug");

  if (featured) {
    const categories = await Category.find({ isFeatured: true });
    return NextResponse.json(categories);
  }
  if (slug) {
    const category = await Category.findOne({ slug });
    return NextResponse.json(category);
  } else if (category_slug) {
    const parentCategory = await Category.findOne({
      slug: category_slug,
    });

    const categories = await Category.find({
      parent: parentCategory?._id,
      isActive: true,
    });
    console.log(categories);

    return NextResponse.json(categories);
  }
}
