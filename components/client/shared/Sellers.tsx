"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ISellerFetched } from "@/types";
import { useGetLatestSellers } from "@/utils/hooks/client/useSellers";

export const Sellers = ({
  sellers: data,
  subdomain,
}: {
  sellers: ISellerFetched[];
  subdomain: string;
}) => {
  const { data: sellers } = useGetLatestSellers(subdomain, data);

  const Card = ({ name, description, profileImage, _id }: ISellerFetched) => {
    return (
      <Link
        href={`/seller/${_id}`}
        className="fc gap-5  blr  h-[150px] px-3 rounded-md md:rounded-lg cursor-pointer shadow-md card-hover"
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
  return (
    <>
      {" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {sellers?.map((seller, index) => {
          return <Card key={index} {...seller} />;
        })}
      </div>
    </>
  );
};
