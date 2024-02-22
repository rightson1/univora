"use client";
import { ICategoryFetched } from "@/types";
import { useFeaturedCategories } from "@/utils/hooks/client/useCategories";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CategoryCard } from "../category_card";

export const Categories = ({
  categories: data,
}: {
  categories: ICategoryFetched[];
}) => {
  const { data: categories } = useFeaturedCategories(data);

  return categories ? (
    <div className="flex-card-wrap">
      {categories?.map((category, index) => (
        <CategoryCard key={index} category={category} />
      ))}
    </div>
  ) : (
    <div className="w-full h-[200px] fc">
      <h2 className="h3 text-indigo-500">No Categories Found</h2>
    </div>
  );
};
