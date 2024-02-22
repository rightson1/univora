import { getS } from "@/app/api/utils/funcs";
import Category from "@/models/Categories";
import Product from "@/models/Product";
import School from "@/models/School";
import { conn } from "@/models/mongo_db_connection";
import { getSchool } from "@/utils/api";
import { products_query } from "@/utils/pipelines/products";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
// export async function GET(req: NextRequest) {
//   await conn();
//   try {
//        const search = req.nextUrl.searchParams.get("search");
//        const page = Number(req.nextUrl.searchParams.get("page")) || 1;
//        const limit = 15;
//        const skip = (page - 1) * limit;

//     const query = {
//       $search: {
//         index: "products",
//         compound: {
//           should: [
//             {
//               text: {
//                 query: search,
//                 path: "name",
//                 score: {
//                   boost: { value: 4 },
//                 },
//               },
//             },
//             {
//               text: {
//                 query: search,
//                 path: "brand",
//                 score: {
//                   boost: { value: 3 },
//                 },
//               },
//             },
//             {
//               text: {
//                 query: search,
//                 path: "tags",
//                 score: {
//                   boost: { value: 2 },
//                 },
//               },
//             },

//             {
//               text: {
//                 query: search,
//                 path: "description",
//                 score: {
//                   boost: { value: 1 },
//                 },
//               },
//             },
//           ],
//         },
//       },
//     };
//     const products = await Product.aggregate([query]);
//     return NextResponse.json(products);
//   } catch (e: any) {
//     return NextResponse.json({
//       message: e.message,
//       success: false,
//     });
//   }
// }
export async function GET(req: NextRequest) {
  await conn();
  try {
    const search = req.nextUrl.searchParams.get("search");
    const page = Number(req.nextUrl.searchParams.get("page")) || 1;
    const limit = Number(req.nextUrl.searchParams.get("limit")) || 15;
    const skip = (page - 1) * limit;
    const school = await getS(req);
    const query = products_query(search);
    const products = await Product.aggregate([
      query,
      { $match: { school: new Types.ObjectId(school) } },
      { $skip: skip },
      { $limit: limit },
    ]);
    return NextResponse.json(products);
  } catch (e: any) {
    return NextResponse.json({
      message: e.message,
      success: false,
    });
  }
}
