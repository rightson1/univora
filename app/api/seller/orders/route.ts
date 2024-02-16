import Order from "@/models/Order";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";
import { conn } from "@/models/mongo_db_connection";
export async function POST(req: NextRequest) {
  await conn();
  const body = await req.json();
  try {
    const order = await Order.create(body);
    //update product stock
    const product = await Product.findByIdAndUpdate(
      body.product,
      {
        $inc: { stock: -body.quantity },
      },
      { new: true }
    );
    return NextResponse.json({
      data: order,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
export async function GET(req: NextRequest) {
  await conn();
  const seller_Id = req.nextUrl.searchParams.get("sellerId");
  Product;
  try {
    const orders = await Order.find({ seller: seller_Id })
      .populate("product")
      .sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
