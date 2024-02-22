"use client";
import { IProductFetched } from "@/types";
import React, { useEffect } from "react";
import { Product_Card } from "../products_card";
import { isArr } from "@/utils/helpers";

export const Product_cards = ({
  products,
  loading,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: {
  products: IProductFetched[] | undefined;
  loading: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}) => {
  return (
    <div>
      <div className="grid  pb-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {loading ? (
          <div className="w-full  py-10 flex justify-center col-span-4">
            <span className="load"></span>
          </div>
        ) : isArr(products) ? (
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
          <div className="w-full  py-10 flex justify-center col-span-4">
            <span className="p-size">No Products Found</span>
          </div>
        )}
      </div>
      {hasNextPage && (
        <div className="flex justify-center">
          <button
            onClick={() => fetchNextPage()}
            className="bg-indigo-500 text-white p-2 rounded-md"
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};
