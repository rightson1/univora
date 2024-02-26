"use client";
import { Product_Card } from "@/components/client/products_card";
import { pRange, priceRange } from "@/utils/helpers";
import { useGetSavedItems } from "@/utils/hooks/client/useProducts";
import { useUser } from "@/utils/userAuth";
import React from "react";

const Saved = () => {
  const { user } = useUser();
  const { data: products, isLoading } = useGetSavedItems(user?._id);

  return (
    <section className="pad-x">
      <h1 className="h2 text-indigo-500">Saved Items</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4  gap-2 sm:gap-5 mt-10">
        {products ? (
          products.map((item, index) => {
            return (
              <Product_Card
                id={item._id}
                slug={item.slug}
                price={item.price}
                description={item.description}
                key={index}
                image={item.thumbnail}
                title={item.name}
                deleteProduct={true}
                descriptionStyles="hidden p-size"
                imageSizes={{ width: 300, height: 300 }}
                deleteBtn={true}
              />
            );
          })
        ) : isLoading ? (
          <div className="w-screen fc h-[60vh]">
            <div className="loading">
              <span className="loading__dot"></span>
              <span className="loading__dot"></span>
              <span className="loading__dot"></span>
            </div>
          </div>
        ) : (
          <div className=" w-[90vw]">
            <h4 className="h3-size">You have no saved items</h4>
          </div>
        )}
      </div>
    </section>
  );
};

export default Saved;
