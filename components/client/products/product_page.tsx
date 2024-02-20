"use client";
import { IProductFetched } from "@/types";
import { useGetProduct } from "@/utils/hooks/client/useProducts";
import React from "react";
import { Media_Display } from "../shared/media_display";

export const Product_Page = ({
  product: product_raw,
  slug,
}: {
  product: IProductFetched;
  slug: string;
}) => {
  const { data: product } = useGetProduct(slug, product_raw);
  return (
    <section className="pad-x  flex-col gap-4 flex mt-20 md:mt-[100px] ">
      <h1 className="p-size text-indigo-500">{`Home > Products >${product.name}`}</h1>
      <div className="flex flex-col md:flex-row  gap-10 mt-5">
        <Media_Display image={product?.thumbnail} gallery={product?.media} />
        <div className="w-full flex-col-start gap-3">
          <h1 className="h2-size text-indigo-500 font-bold">{product?.name}</h1>

          {product?.longDescription ? (
            <div
              dangerouslySetInnerHTML={{ __html: product.longDescription }}
              className="p-size prose"
              style={{ width: "100%" }}
            ></div>
          ) : product.description ? (
            <p className="p-size">{product.description}</p>
          ) : null}
          <div className="bg-black-400 p-[1px] w-full" />

          <h5 className="h3-size">ksh {product?.price}</h5>

          <p className="p-size">
            <span className="h3-size pr-1">NB</span>
            Payment is done on delivery.When you check out , only your details
            will be sent to the seller.
          </p>

          {/* <div className="my fb gap-5">
            <Link href={`/checkout/${product.slug}`}>
              <Button containerStyles="filled" title="Checkout" />
            </Link>

            <Link href={`/dealers/${product.businessId}`}>
              <Button containerStyles="outlined" title="View Seller Shop" />
            </Link>
          </div> */}
        </div>
      </div>
      <div className="mt-10">
        <h1 className="h2-size text-indigo-500">Customers Also Viewed</h1>
        {/* <Suspense fallback={<div>Loading...</div>}>
          <Related
            {...{
              tags: product.tags,
              slug: product.slug,
              category: product.categories[0],
            }}
          />
        </Suspense> */}
      </div>
    </section>
  );
};
