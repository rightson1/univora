import { IProductFetched } from "@/types";
import React from "react";
import { Product_Card } from "../products_card";

export const Product_cards = ({
  products,
  loading,
}: {
  products: IProductFetched[] | undefined;
  loading: boolean;
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {loading ? (
        <div>Loading...</div>
      ) : products ? (
        products?.map((product, index: number) => {
          return (
            <Product_Card
              key={index}
              id={product._id}
              slug={product.slug}
              price={product.price}
              description={product.description}
              image={product.thumbnail}
              title={product.name}
              imageStyles="w-full h-[150px] sm:h-[200px] object-cover  rounded-[5px]"
              descriptionStyles="p-size"
              imageSizes={{ width: 300, height: 300 }}
              button={false}
            />
          );
        })
      ) : (
        <div>No products found</div>
      )}
    </div>
  );
};
