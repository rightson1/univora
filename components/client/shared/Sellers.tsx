"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ISellerFetched } from "@/types";
import { useGetLatestSellers } from "@/utils/hooks/client/useSellers";
import { isArr } from "@/utils/helpers";
import { Button } from "@/components/ui/button";
import { vArr } from "@/app/api/utils/funcs";

export const Sellers_Cards = ({
  sellers,
  notFoundText,
}: {
  sellers: ISellerFetched[] | undefined;
  notFoundText?: string;
}) => {
  return isArr(sellers) ? (
    <div className="fx-c gap-5">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {sellers?.map((seller, index) => {
          return <Card key={index} {...seller} />;
        })}
      </div>
    </div>
  ) : (
    <div className="w-full h-[200px] fc">
      <h2 className="h4 text-indigo-500">
        {notFoundText || " No Sellers Found,be the first to sell"}
      </h2>
    </div>
  );
};
export const Sellers_Home = ({
  sellers: data,
  subdomain,
}: {
  sellers: ISellerFetched[];
  subdomain: string;
}) => {
  const { data: sellers } = useGetLatestSellers(subdomain, data);
  return (
    <section className="pad-x flex-col-start gap-5">
      <h2 className="h2-size text-indigo-500 text-start   mt-5">
        Newest Sellers
      </h2>
      <Sellers_Cards sellers={sellers} />
      {vArr(sellers) && (
        <Link href="/sellers" className="w-full fc">
          <Button variant={"indigo"} className="rounded-full">
            View All
          </Button>
        </Link>
      )}
    </section>
  );
};
export const Card = ({
  name,
  description,
  profileImage,
  slug,
}: ISellerFetched) => {
  return (
    <Link
      href={`/sellers/${slug}`}
      className="fc gap-5  blr  max-h-[200px] px-3 rounded-md md:rounded-lg cursor-pointer shadow-md card-hover py-4"
    >
      <div className="flex  ">
        <Image
          height={200}
          width={200}
          src={
            profileImage ||
            "https://firebasestorage.googleapis.com/v0/b/hue-14696.appspot.com/o/product%2Fplaceholder%2Fpexels-photo-577769.webp?alt=media&token=183397c3-3044-4363-aa18-97095d1c181f"
          }
          alt={name}
          className="w-[70px] h-[70px] rounded-full  object-cover"
        />
      </div>
      <div className="flex-col-start w-full flex-[2]">
        <h3 className="h3-size text-indigo-500">{name}</h3>
        <p className="text-gray-500  p-size">
          {description && description.length > 50
            ? description.slice(0, 100) + "..."
            : description}
        </p>
      </div>
    </Link>
  );
};
