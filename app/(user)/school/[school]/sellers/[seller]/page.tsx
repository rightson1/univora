import { Seller_Comp } from "@/components/client/sellers/seller_page";
import { getProductsBySeller, getSingleSeller } from "@/utils/api";
import Image from "next/image";
import React from "react";

const Page = async ({
  params,
}: {
  params: {
    seller: string;
  };
}) => {
  const [seller, products] = await Promise.all([
    getSingleSeller(params.seller),
    getProductsBySeller(params.seller),
  ]);

  return <Seller_Comp seller_raw={seller} products={products} />;
};

export default Page;
