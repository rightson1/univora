import Business from "@/models/Seller";
import { conn } from "@/models/mongo_db_connection";
import { ISeller, ISellerBase, ISellerFetched } from "@/types";
import { verifyIdToken } from "@/utils/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await conn();
}
//edit seller
export async function PUT(req: NextRequest) {
  await conn();
  await verifyIdToken(req);

  try {
    const seller: ISellerFetched = await req.json();
    const no_of_slugs = await Business.countDocuments({ slug: seller.slug });
    if (no_of_slugs > 1) {
      return NextResponse.json({
        message: `There exists a seller with name ${seller.slug}`,
        success: false,
      });
    }

    const updatedSeller = await Business.findOneAndUpdate(
      {
        _id: seller._id,
      },
      seller,
      { new: true }
    );
    return NextResponse.json({
      message: "Seller updated successfully",
      success: true,
      data: updatedSeller,
    });
  } catch (e: any) {
    console.log(e.message);
    return NextResponse.json({
      message: e.message,
      success: false,
    });
  }
}
