"use client";
import { IProductFetched, IVariantFetched } from "@/types";
import { useGetProduct } from "@/utils/hooks/client/useProducts";
import React, { useState } from "react";
import { Media_Display } from "../shared/media_display";
import { Button } from "@/components/ui/button";
import { fv, priceRange } from "@/utils/helpers";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "timeago.js";
import { vArr } from "@/app/api/utils/funcs";
import { Related } from "./related_products";

export const Product_Page = ({
  product: product_raw,
  slug,
}: {
  product: IProductFetched;
  slug: string;
}) => {
  const { data: product } = useGetProduct(slug, product_raw);
  const [selectedVariant, setSelectedVariant] = useState<IVariantFetched>();
  const seller = product?.business;
  const handleVariantSelect = (variant: IVariantFetched) => {
    setSelectedVariant(variant);
  };

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

          {selectedVariant ? (
            <h5 className="h3-size">ksh {selectedVariant.price}</h5>
          ) : (
            <h5 className="h3-size">
              ksh {priceRange(product.price, product.variants)}
            </h5>
          )}
          <div className="p-4 shadow-sm w-full rounded-lg ">
            {vArr(product.variants) && (
              <h2 className="h4 font-bold mb-4 ">Select Variants</h2>
            )}
            <div className="text-h6 mb-2 ">
              <strong>Stock:</strong>{" "}
              {selectedVariant ? selectedVariant.stock : product.stock}
            </div>
            {product.variants && (
              <div className="flex flex-wrap gap-2">
                {fv(product.variants).map((variant, index) => (
                  <Button
                    key={index}
                    onClick={() => handleVariantSelect(variant)}
                    className="flex gap-2"
                    variant={
                      selectedVariant?.options === variant.options
                        ? "default"
                        : "outline"
                    }
                  >
                    {/* Display variant options */}
                    {Object.keys(variant.options).map((key) => (
                      <span key={key} className="">
                        <strong>{key}:</strong> {variant.options[key]}
                      </span>
                    ))}
                  </Button>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-5 flex-col md:flex-row items-start w-full">
            <div className="blr p-4 rounded-md w-full ">
              <div className="flex gap-2">
                <Avatar>
                  <AvatarImage src={seller.profileImage} alt="@shadcn" />
                  <AvatarFallback>{seller?.name}</AvatarFallback>
                </Avatar>
                <div className="fx-c">
                  <Link href={`/sellers/${seller?.slug}`} className="h4">
                    {seller?.name}
                  </Link>
                  <div className="fc">
                    <span className="font-semibold text-sm">Joined:</span>
                    <span className="text-sm">
                      {format(new Date(seller.createdAt))}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="my fx-c gap-1 w-full">
              <Link href={`/checkout/${product.slug}`} className="w-full flex">
                <Button variant={"outline"} className="w-full">
                  Checkout
                </Button>
              </Link>

              <Link
                href={`/sellers/${product.business._id}`}
                className="w-full flex"
              >
                <Button className="w-full">View Seller Shop</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h1 className="h4 text-indigo-500">Related Items</h1>
        <Related product={product} />
      </div>
    </section>
  );
};
