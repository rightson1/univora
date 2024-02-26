"use client";
import { IOrderFetched } from "@/types";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { hasVariants } from "@/app/api/utils/funcs";
import { isProduct } from "@/utils/helpers";
export const View_Order = ({ order }: { order: IOrderFetched }) => {
  const product = order.product;
  const variant = order.variant;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"indigo"} className="">
          View
        </Button>
      </DialogTrigger>
      <DialogContent
        className="
        max-w-[90vw] sm:max-w-[600px]
        "
      >
        <form
          className=" mb:max-h-[80vh] 
    max-h-[90vh] rounded-md md:p-4 flex flex-col"
        >
          <DialogHeader>
            <DialogTitle className="text-center">Order Details</DialogTitle>
            <DialogDescription className="text-center">
              Shop:
              <Link
                href={`/sellers/${order.seller.slug}`}
                className="underline"
              >
                {order.seller.name}
              </Link>
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto flex-grow px-2 py-5 flex flex-col  items-start md:flex-row-reverse gap-20 md:gap-10  ">
            <div
              className="w-full p-4 fx-c gap-3
                  "
            >
              {/* Item receipts/order */}
              <div className="flex-col-start gap-2 w-full">
                <h2 className="p-size text-indigo-500 font-bold">
                  Order Summary
                </h2>
              </div>
              <div className="fb w-full">
                <h2 className="p-size text-indigo-500 font-semibold">
                  Product
                </h2>
                <h2 className="p-size text-indigo-500 font-semibold">Total</h2>
              </div>
              <hr className="h-[1px] bg-gray-300 w-full" />
              <div className="fb w-full">
                <h2 className="p-size text-indigo-500">{product.name}</h2>
                <h2 className="p-size text-indigo-500">{product.price}</h2>
              </div>
              {hasVariants(product) && (
                <div className="fb w-full">
                  <h2 className="p-size text-indigo-500">Variant</h2>
                  <h2 className="p-size text-indigo-500">
                    {Object.keys(variant!.options).map((key) => (
                      <span key={key} className="">
                        <strong>{key}:</strong> {variant!.options[key]}
                      </span>
                    ))}
                  </h2>
                </div>
              )}
              {isProduct(product) && (
                <div className="fb w-full">
                  <h2 className="p-size text-indigo-500">Quantity</h2>
                  <h2 className="p-size text-indigo-500">{order.quantity}</h2>
                </div>
              )}

              <div className="fb w-full">
                <h2 className="p-size text-indigo-500">Payment Status</h2>
                <h2 className="p-size text-indigo-500">
                  {order.paymentStatus}
                </h2>
              </div>
              <div className="fb w-full">
                <h2 className="p-size text-indigo-500">Total</h2>
                <h2 className="p-size text-indigo-500">{order.totalAmount}</h2>
              </div>
              {/* cash on  delivery */}
              <div className="fb w-full">
                <h2 className="p-size text-indigo-500 font-bold">
                  Payment Method
                </h2>
                <label className="" htmlFor="name">
                  {order.paymentMethod === "cash"
                    ? "Cash on Delivery"
                    : order.paymentMethod}
                </label>
              </div>
            </div>
          </div>
          {/* <DialogFooter className="py-2">
            <div className="flex flex-wrap gap-2 justify-end">
              <Button variant="outline" type="button">
                Cancel
              </Button>
              <Button type="submit">Save changes</Button>
            </div>
          </DialogFooter> */}
        </form>
      </DialogContent>
    </Dialog>
  );
};
