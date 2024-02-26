import { Seller_Comp } from "@/components/client/sellers/seller_page";
import Item_not_found from "@/components/shared/item_not_found";
import { TPageProps } from "@/types";
import { getProductsBySeller, getSchool, getSingleSeller } from "@/utils/api";
import { Metadata, ResolvingMetadata } from "next";
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
  if (!seller) {
    return (
      <Item_not_found ptxt="Seller not found" link="/" btxt="Go back home" />
    );
  }
  return <Seller_Comp seller_raw={seller} products={products} />;
};

export async function generateMetadata(
  { params, searchParams }: TPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const seller = await getSingleSeller(params.seller);
  const title = seller.name;
  const description = seller.description || "";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [seller.profileImage || ""],
    },
  };
}

export default Page;
