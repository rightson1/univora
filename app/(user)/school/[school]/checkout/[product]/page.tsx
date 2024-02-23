import { Checkout_Page } from "@/components/client/products/checkout";
import { Product_Page } from "@/components/client/products/product_page";
import { getSingleProduct } from "@/utils/api";
import React from "react";

const Product = async ({
  params,
}: {
  params: {
    product: string;
  };
}) => {
  const product_raw = await getSingleProduct(params.product);

  return <Checkout_Page product={product_raw} slug={params.product} />;
};

export default Product;
