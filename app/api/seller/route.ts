import Product from "@/models/Product";
import Business from "@/models/Seller";
import { conn } from "@/models/mongo_db_connection";
import { ISeller, ISellerBase, ISellerFetched } from "@/types";
import { auth_admin, verifyIdToken } from "@/utils/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  try {
    await conn();
    await verifyIdToken(req);
    //set all products status to published
    const products = await Product.find();
    return NextResponse.json({
      message: products,
      success: true,
    });
  } catch (e: any) {
    return NextResponse.json({
      message: e.message,
      success: false,
    });
  }
}
//edit seller
export async function PUT(req: NextRequest) {
  try {
    await conn();
    await verifyIdToken(req);
    const seller: ISellerFetched = await req.json();
    const no_of_slugs = await Business.countDocuments({ slug: seller.slug });
    if (no_of_slugs > 1) {
      return NextResponse.json({
        message: `There exists a seller with name ${seller.slug}`,
        success: false,
      });
    }
    console.log(seller);
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
//delete seller
export async function DELETE(req: NextRequest) {
  try {
    await conn();
    await verifyIdToken(req);
    const { _id } = await req.json();
    const seller = await Business.findById(_id);
    const auth = await auth_admin();
    await auth.deleteUser(seller?.uid);
    const deleted = await Product.deleteMany({ business: _id });
    if (deleted.deletedCount) {
      const deletedSeller = await Business.findByIdAndDelete(_id);
    }
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
