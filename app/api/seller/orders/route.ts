import Order from "@/models/Order";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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
