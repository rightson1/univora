import { Product_Page } from "@/components/client/products/product_page";
import Item_not_found from "@/components/shared/item_not_found";
import { TPageProps } from "@/types";
import { getSingleProduct } from "@/utils/api";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";

const Product = async ({
  params,
}: {
  params: {
    product: string;
    school: string;
  };
}) => {
  const product = await getSingleProduct(params.product);
  if (!product) {
    return (
      <Item_not_found ptxt="Product not found" link="/" btxt="Go back home" />
    );
  }
  return (
    <Product_Page
      product={product}
      slug={params.product}
      school={params.school}
    />
  );
};
export async function generateMetadata(
  { params, searchParams }: TPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.school;
  const product = await getSingleProduct(params.product);

  const title = product?.name || "Product";
  const description = product?.description || "";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [product?.thumbnail || ""],
      locale: "en_US",
      type: "website",
    },
  };
}

export default Product;
