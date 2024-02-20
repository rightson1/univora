"use client";
import { ICategoryFetched } from "@/types";
import { useFeaturedCategories } from "@/utils/hooks/client/useCategories";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CategoryCard } from "./category_card";

export const Categories = ({
  categories: data,
}: {
  categories: ICategoryFetched[];
}) => {
  const { data: categories } = useFeaturedCategories(data);

  return (
    <div className="flex-card-wrap">
      {categories?.map((category, index) => (
        <CategoryCard key={index} category={category} />
      ))}
    </div>
  );
};
