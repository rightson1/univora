import Order from "@/models/Order";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";
import { conn } from "@/models/mongo_db_connection";
import { IOrderFetched, IProductFetched, ISellerFetched } from "@/types";
import { verifyIdToken } from "@/utils/firebaseAdmin";
import { hasVariants } from "../../utils/funcs";
import Seller from "@/models/Seller";
import { mail_options, transporter } from "@/components/emails/email_options";
import { IUserFetched } from "@/types/client";
import { NewOrderEmail } from "@/components/emails/New_Order";
import { render } from "@react-email/render";
import { OrderConfirmation } from "@/components/emails/Order_Confirmation";
import { isProduct } from "@/utils/helpers";
import User from "@/models/User";
export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
  try {
    await conn();
    const body = await req.json();
    const order: IOrderFetched = await Order.create(body);
    const customer: IUserFetched | null = await User.findById(order.customer);
    const seller: ISellerFetched | null = await Seller.findById(order.seller);
    const orderProduct: IProductFetched | null = await Product.findById(
      body.product
    );
    if (customer && seller) {
      const seller_options = mail_options({
        from: '"UNIVORA" <notifications@univora.co.ke>',
        to: seller.email,
        subject: "New Order Received",
        html: render(
          NewOrderEmail({
            name: customer.displayName,
            email: customer.email,
            phone: customer.phone!,
            item: orderProduct?.name!,
            total: order.totalAmount,
            message: order.message,
          })
        ),
      });
      const customer_options = mail_options({
        from: '"UNIVORA" <notifications@univora.co.ke>',
        to: customer.email,
        subject: "Order Confirmation",
        html: render(
          OrderConfirmation({
            name: customer.displayName,
            email: customer.email,
            phone: order.customerPhone!,
            item: orderProduct?.name!,
            total: order.totalAmount,
          })
        ),
      });
      await Promise.all([
        transporter.sendMail(seller_options),
        transporter.sendMail(customer_options),
      ]);
    }

    if (orderProduct && isProduct(orderProduct)) {
      if (orderProduct.variants && hasVariants(orderProduct)) {
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
      console.log({ orderProduct });
    }

    return NextResponse.json({
      data: order,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
export async function GET(req: NextRequest) {
  try {
    await conn();

    const user_Id = req.nextUrl.searchParams.get("user_id");
    Product;
    const orders = await Order.find({
      customer: user_Id,
    })
      .populate([
        {
          path: "product",
        },
        {
          path: "seller",
        },
      ])
      .sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
