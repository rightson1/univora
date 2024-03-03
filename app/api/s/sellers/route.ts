import Product from "@/models/Product";
import Seller from "@/models/Seller";
import { conn } from "@/models/mongo_db_connection";
import { ISeller, ISellerBase, ISellerFetched } from "@/types";
import { auth_admin } from "@/utils/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  await conn();
  const sellers = await Seller.find();

  return NextResponse.json(sellers);
}
export async function DELETE(req: NextRequest) {
  try {
    await conn();
    const { _id } = await req.json();
    const seller = await Seller.findById(_id);
    const deleted = await Product.deleteMany({ business: _id });
    const deletedSeller = await Seller.findByIdAndDelete(_id);

    return NextResponse.json({
      message: "Seller deleted successfully",
      success: true,
    });
  } catch (e: any) {
    return NextResponse.json({
      message: e.message,
      success: false,
    });
  }
}
