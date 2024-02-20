"use client";
import { ICategoryFetched } from "@/types";
import {
  useFeaturedCategories,
  useGetSubcategories,
} from "@/utils/hooks/client/useCategories";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CategoryCard } from "../category_card";

export const Sub_Categories = ({
  categories: data,
  parent_slug,
}: {
  categories: ICategoryFetched[];
  parent_slug: string;
}) => {
  const { data: categories } = useGetSubcategories(parent_slug, data);

  return (
    <div className="category-grid gap-5 pt-5">
      {categories.map((category, index) => {
        const { name, image, slug } = category;
        return (
          <Link
            key={index}
            href={`/category/${slug}`}
            className="fc gap-5 py-3  product-card  px-3 rounded-md md:rounded-lg cursor-pointer shadow-md w-full card-hover "
          >
            <div className="flex ">
              <Image
                height={200}
                width={200}
                src={image || "/non.jpg"}
                alt={name}
                className="w-[50px] h-[50px] rounded-full  object-cover"
              />
            </div>
            <div className="flex-col-start w-full flex-[2]">
              <h3 className=" text-indigo-500">{name}</h3>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
