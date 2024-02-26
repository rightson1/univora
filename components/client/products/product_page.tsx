"use client";
import {
  IProductFetched,
  IProductWithSchool,
  ISellerFetched,
  IVariantFetched,
} from "@/types";
import {
  useAddProductToSaved,
  useGetProduct,
} from "@/utils/hooks/client/useProducts";
import React, { useEffect, useState } from "react";
import { Media_Display } from "../shared/media_display";
import { Button } from "@/components/ui/button";
import { fv, pQty, priceRange } from "@/utils/helpers";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "timeago.js";
import { vArr } from "@/app/api/utils/funcs";
import { Related } from "./related_products";
import { useUser } from "@/utils/userAuth";

import { Checkout_Form } from "./checkout";
import { useCustomToast } from "@/components/helpers/functions";
import { protocal } from "@/utils/data";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export const Product_Page = ({
  product: product_raw,
  slug,
  school,
}: {
  product: IProductWithSchool;
  slug: string;
  school: string;
}) => {
  const { data: product } = useGetProduct(slug, product_raw);
  const [selectedVariant, setSelectedVariant] = useState<IVariantFetched>();
  const seller = product?.business;
  const handleVariantSelect = (variant: IVariantFetched) => {
    setSelectedVariant(variant);
  };
  const { user, handleSignIn } = useUser();
  const { mutateAsync: add } = useAddProductToSaved();
  const { customToast, loading } = useCustomToast();

  const [sameSchool, setSameSchool] = useState(
    product.school.subdomain === school ? true : false
  );
  const router = useRouter();
  useEffect(() => {
    setSameSchool(product.school.subdomain === school ? true : false);
  }, [product.school.subdomain, school]);
  const SellerCard = () => {
    return (
      <div className="flex gap-2">
        <Avatar>
          <AvatarImage src={seller.profileImage} alt="@shadcn" />
          <AvatarFallback>{seller?.name}</AvatarFallback>
        </Avatar>
        <div className="fx-c">
          <h6 className="h4 underline">{seller?.name}</h6>
          <div className="fc">
            <span className="font-semibold text-sm">Joined:</span>
            <span className="text-sm">
              {format(new Date(seller.createdAt))}
            </span>
          </div>
          <div className="fc">
            <span className="font-semibold text-sm">School:</span>
            <span className="text-sm">{product.school.name}</span>
          </div>
        </div>
      </div>
    );
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
              <strong>Stocks:</strong> {pQty(product, selectedVariant)}
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
            {sameSchool ? (
              <Link
                className="blr p-4 rounded-md w-full  cursor-pointer"
                href={`/sellers/${seller.slug}`}
              >
                <SellerCard />
              </Link>
            ) : (
              <div
                className="blr p-4 rounded-md w-full  cursor-pointer"
                onClick={(e) => {
                  toast(`Redirect to ${product.school.name}?`, {
                    description: `Product is from a different school, are you sure you want to redirect`,
                    action: {
                      label: "Let go baby!",
                      onClick: () => {
                        router.push(
                          `${protocal}://${product.school.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/sellers/${product.business.slug}`
                        );
                      },
                    },
                  });
                }}
              >
                <SellerCard />
              </div>
            )}

            <div className="my fx-c gap-1 w-full">
              <Checkout_Form product={product} variant={selectedVariant} />
              <Button
                className="w-full"
                onClick={async (e) => {
                  if (!user) {
                    await handleSignIn();
                  } else {
                    customToast({
                      func: () => add({ user: user._id, item: product._id }),
                      suc: "Product saved",
                    });
                  }
                }}
              >
                Save Product
              </Button>
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
