import { Product_Page } from "@/components/client/products/product_page";
import { getSingleProduct } from "@/utils/api";
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

  return (
    <Product_Page
      product={product}
      slug={params.product}
      school={params.school}
    />
  );
};

export default Product;
