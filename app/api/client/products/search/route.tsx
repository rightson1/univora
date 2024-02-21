import Category from "@/models/Categories";
import Product from "@/models/Product";
import School from "@/models/School";
import { conn } from "@/models/mongo_db_connection";
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
    const subdomain = req.nextUrl.searchParams.get("school");
    const page = Number(req.nextUrl.searchParams.get("page")) || 1;
    const limit = Number(req.nextUrl.searchParams.get("limit")) || 15;
    const skip = (page - 1) * limit;
    const school = await School.findOne({ subdomain });
    if (!school) {
      return NextResponse.json({
        message: "School not found",
        success: false,
      });
    }

    const query = {
      $search: {
        index: "products",
        compound: {
          should: [
            {
              text: {
                query: search,
                path: "name",
                score: {
                  boost: { value: 4 },
                },
              },
            },
            {
              text: {
                query: search,
                path: "brand",
                score: {
                  boost: { value: 3 },
                },
              },
            },
            {
              text: {
                query: search,
                path: "tags",
                score: {
                  boost: { value: 2 },
                },
              },
            },
            {
              text: {
                query: search,
                path: "description",
                score: {
                  boost: { value: 1 },
                },
              },
            },
          ],
        },
      },
    };

    const products = await Product.aggregate([
      query,
      { $match: { school: school._id } },
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
