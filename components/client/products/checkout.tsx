"use client";
import { IProductFetched } from "@/types";
import { useGetProduct } from "@/utils/hooks/client/useProducts";
import React from "react";
export const Checkout_Page = ({
  product: product_raw,
  slug,
}: {
  product: IProductFetched;
  slug: string;
}) => {
  const { data: product } = useGetProduct(slug, product_raw);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {};
  return (
    <section className="pad-x  flex-col gap-4 flex mt-20 md:mt-[100px] ">
      <form onSubmit={submit} className="cols-2 gap-20 md:gap-10  mt-5 ">
        <div>
          <div className="flex-col-start gap-5">
            <h2 className="p-size text-indigo-500">Billing Details</h2>
          </div>
          <div className="cols-2  w-full mt-5 ">
            <div className="flex-col-start gap-2 col-span-2 md:col-span-1">
              <label htmlFor="name">Name*</label>
              <input
                type="text"
                name="name"
                id="name"
                className="w-full p-2 border-2 border-black-400  outline-none"
                required
              />
            </div>
            <div className="flex-col-start gap-2 w-full col-span-2 md:col-span-1">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full p-2 border-2 border-black-400 outline-none"
                required
              />
            </div>
            <div className="flex-col-start gap-2 w-full  col-span-2">
              <label htmlFor="phone">Phone*</label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="Phone Number"
                id="phone"
                className="p-2 border-2 border-black-400 outline-none w-full"
              />
            </div>
            <div className="flex-col-start gap-2 w-full col-span-2">
              {/* textare for more datails */}
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                id="message"
                placeholder="Leave a message"
                className="w-full p-2 border-2 border-black-400 outline-none "
              ></textarea>
            </div>
          </div>
        </div>
        <div className="flex-col-start gap-5 border-gray-300 p-4 border-[1px] md:mr-5  rounded-md">
          {/* Item receipts/order */}
          <div className="flex-col-start gap-2 w-full">
            <h2 className="p-size text-indigo-500 font-bold">Order Summary</h2>
          </div>
          <div className="fb w-full">
            <h2 className="p-size text-indigo-500 font-semibold">Product</h2>
            <h2 className="p-size text-indigo-500 font-semibold">Total</h2>
          </div>
          <hr className="h-[1px] bg-gray-300 w-full" />
          <div className="fb w-full">
            <h2 className="p-size text-indigo-500">{product.name}</h2>
            <h2 className="p-size text-indigo-500">{product.price}</h2>
          </div>
          <div className="fb w-full">
            <h2 className="p-size text-indigo-500">Subtotal</h2>
            <h2 className="p-size text-indigo-500">{product.price}</h2>
          </div>
          <div className="fb w-full">
            <h2 className="p-size text-indigo-500">Shipping</h2>
            <h2 className="p-size text-indigo-500">Local Pickup</h2>
          </div>
          <div className="fb w-full">
            <h2 className="p-size text-indigo-500">Total</h2>
            <h2 className="p-size text-indigo-500">{product.name}</h2>
          </div>
          {/* cash on  delivery */}
          <div className="fb w-full">
            <h2 className="p-size text-indigo-500 font-bold">Payment Method</h2>
            <label className="" htmlFor="name">
              Cash on Delivery
            </label>
          </div>
          {/* Checkout Button */}
          <div className="w-full">
            <button
              className="w-full bg-indigo-500 text-white p-2 rounded-md"
              type="submit"
            >
              Checkout
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};
