"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IPcard } from "@/types/client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { isArr, priceRange } from "@/utils/helpers";
import { IVariantFetched } from "@/types";
import { useUser } from "@/utils/userAuth";
import {
  useAddProductToSaved,
  useDeleteProductFromSaved,
} from "@/utils/hooks/client/useProducts";
import { useCustomToast } from "../helpers/functions";

export const Product_Card = ({
  title,
  id,
  price,
  slug,
  description,
  image,
  imageStyles,
  descriptionStyles,
  titleStyles,
  containerStyles,
  priceStyles,
  titleContainerStyles,
  imageSizes,
  deleteBtn,
  slice = 40,
  button = true,
  setBottom,
  variants,
}: IPcard) => {
  const router = useRouter();
  const { user, handleSignIn } = useUser();
  const { mutateAsync: add } = useAddProductToSaved();
  const { mutateAsync: remove } = useDeleteProductFromSaved();
  const { customToast, loading } = useCustomToast();

  return (
    <div
      className={
        containerStyles ||
        " w-full  h-full shadow-md p-0 my-3 product-bg card-hover"
      }
      onClick={() => {
        router.push(`/products/${slug}`);
      }}
    >
      <Link href={`/products/${slug}`}>
        <Image
          src={image}
          alt={title}
          width={imageSizes?.width || 500}
          height={imageSizes?.height || 500}
          className={
            imageStyles
              ? imageStyles
              : "w-full h-[150px] md:h-[200px] object-cover rounded-[5px]"
          }
        />
      </Link>
      <div className={` flex-col-start gap-3 p-4 w-full `}>
        <Link
          href={`/products/${slug}`}
          className={`${titleContainerStyles} w-full`}
        >
          <span
            className={
              "hover-text" &&
              (titleStyles ||
                "flex justify-between gap-1 cursor-pointer items-start  flex-col-reverse ")
            }
          >
            {title.length > slice ? title.slice(0, 20) + "..." : title}
          </span>
          <span className="flex  gap-1">
            <span className={priceStyles || "p-size font-bold text-indigo-500"}>
              {priceRange(price, variants)}
            </span>
            <span className="text-black-200 text-[9px]">Ksh</span>
          </span>
        </Link>
        <Link href={`/products/${slug}`} className="w-full ">
          <p
            className={"hover-text" && (descriptionStyles || "p-size hidden ")}
          >
            {description?.length > 50
              ? description.slice(0, 50) + "..."
              : description}
          </p>
        </Link>
        {button && (
          <Button
            disabled={loading}
            onClick={async (e) => {
              e.stopPropagation();
              if (!user) {
                await handleSignIn();
              }
              if (deleteBtn) {
                customToast({
                  func: () => remove({ userId: user?._id!, item: id }),
                  suc: "Remove",
                });
              } else {
                customToast({
                  func: () => add({ user: user?._id!, item: id }),
                  suc: "Product saved",
                });
              }
            }}
            variant={"outline"}
            className="rounded-full bg-transparent"
          >
            {deleteBtn ? "Remove Product" : "  Save Product"}
          </Button>
        )}
      </div>
    </div>
  );
};
