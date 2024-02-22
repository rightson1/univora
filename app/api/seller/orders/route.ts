import Order from "@/models/Order";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";
import { conn } from "@/models/mongo_db_connection";
import { IProductFetched } from "@/types";
import { verifyIdToken } from "@/utils/firebaseAdmin";
export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
  try {
    await conn();
    await verifyIdToken(req);
    const body = await req.json();
    const order = await Order.create(body);
    //update product stock

    const orderProduct: IProductFetched | null = await Product.findById(
      body.product
    );
    if (!orderProduct) {
      throw new Error("Product not found");
    }
    if (orderProduct.productType === "product" && orderProduct.stock) {
      if (orderProduct.stock < 1) {
        return NextResponse.json({
          message: "Product out of stock",
          success: false,
        });
      }
      if (orderProduct.variants && orderProduct.variants?.length > 0) {
        const orderVariant = order.variant;
        const variantId = orderVariant?._id;

        const p = await Product.findOneAndUpdate(
          { _id: body.product, "variants._id": variantId },
          {
            $inc: {
              stock: -body.quantity,
              "variants.$.stock": -body.quantity,
            },
          },
          { new: true }
        );
        console.log(p);
      } else {
        await Product.findByIdAndUpdate(
          body.product,
          {
            $inc: {
              stock: -body.quantity,
            },
          },
          { new: true }
        );
      }
    }

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
  try {
    await conn();
    await verifyIdToken(req);
    const seller_Id = req.nextUrl.searchParams.get("sellerId");
    Product;
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
