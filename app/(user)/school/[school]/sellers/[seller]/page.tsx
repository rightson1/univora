import { Seller_Comp } from "@/components/client/sellers/seller_page";
import { getSingleSeller } from "@/utils/api";
import Image from "next/image";
import React from "react";

const Page = async ({
  params,
}: {
  params: {
    seller: string;
  };
}) => {
  const seller = await getSingleSeller(params.seller);

  return <Seller_Comp seller_raw={seller} />;
};

export default Page;
