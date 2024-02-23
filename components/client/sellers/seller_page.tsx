"use client";
import { ISellerFetched } from "@/types";
import { useGetSeller } from "@/utils/hooks/client/useSellers";
import Image from "next/image";
import React from "react";

export const Seller_Comp = ({ seller_raw }: { seller_raw: ISellerFetched }) => {
  const { data: seller } = useGetSeller(seller_raw.slug, seller_raw);

  return (
    <div className="w-full ">
      <div className="px-40">
        <div className="w-full rounded-full   pt-10 relative ">
          <Image
            src={seller?.profileImage || "/non.jpg"}
            alt={seller?.name}
            height={1000}
            width={1000}
            className="h-[300px] w-full object-cover rounded-md  "
          />
          <div className="blr fx-c gap-3 absolute top-0 right-10 w-full max-w-[400px] rounded-md p-8">
            <div className="h3 text-indigo">{seller?.name}</div>
            <p className="p">{seller?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
