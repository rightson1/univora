import Order from "@/models/Order";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";
import { conn } from "@/models/mongo_db_connection";
import { IOrderFetched } from "@/types";
import { verifyIdToken } from "@/utils/firebaseAdmin";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  try {
    await conn();
    await verifyIdToken(req);
    const _id = req.nextUrl.searchParams.get("_id");
    Product;
    const order = await Order.findOne({ _id }).populate("product");
    return NextResponse.json(order);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
//edit
export async function PUT(req: NextRequest) {
  try {
    await conn();
    await verifyIdToken(req);
    const orderData: IOrderFetched = await req.json();
    const _id = orderData._id;
    console.log(orderData);
    Product;
    const order = await Order.findOneAndUpdate({ _id }, orderData, {
      new: true,
    }).populate("product");

    return NextResponse.json(order);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
//delete order
export async function DELETE(req: NextRequest) {
  try {
    await verifyIdToken(req);
    await conn();
    const _id = req.nextUrl.searchParams.get("_id");
    const order = await Order.findOneAndDelete({ _id });
    return NextResponse.json(order);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
