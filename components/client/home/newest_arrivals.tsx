"use client";
import { IProductFetched } from "@/types";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product_Card } from "../products_card";
import { useGetNewestArrivals } from "@/utils/hooks/client/useProducts";

export const Newest_Arrials = ({
  subdomain,
  products: data,
}: {
  subdomain: string;
  products: IProductFetched[];
}) => {
  const { data: products } = useGetNewestArrivals(subdomain, data);
  return (
    <Carousel className="w-full ">
      <CarouselContent className="-ml-1  gap-4">
        {products?.map((product, index) => (
          <CarouselItem
            key={index}
            className="pl-1 
          max-w-[250px] 
          
          "
          >
            <Product_Card
              id={product._id}
              price={product.price}
              description={product.description}
              image={product.thumbnail}
              slug={product.slug}
              title={product.name}
              imageStyles=" h-[200px] object-cover rounded-[5px]"
              descriptionStyles="p-size "
              slice={20}
              titleStyles="text-[17px] font-bold wrap"
              containerStyles="product-bd w-[250px]  h-[430px] shadow-md  overflow-hidden card-hover"
              priceStyles="text-[15px] font-semibold"
              titleContainerStyles="flex justify-between gap-5 items-start"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        className="absolute left-0 blr 
      text-orange-500
      "
      />
      <CarouselNext
        className="absolute right-0 blr 
      text-orange-500"
      />
    </Carousel>
  );
};
