import Order from "@/models/Order";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";
import { conn } from "@/models/mongo_db_connection";
import { IOrderFetched } from "@/types";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  await conn();
  const _id = req.nextUrl.searchParams.get("_id");
  Product;
  try {
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
  await conn();
  const orderData: IOrderFetched = await req.json();
  const _id = orderData._id;
  console.log(orderData);
  try {
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
