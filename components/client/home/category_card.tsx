"use client";
import { ICategoryFetched } from "@/types";
import { useFeaturedCategories } from "@/utils/hooks/client/useCategories";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const CategoryCard = ({ category }: { category: ICategoryFetched }) => {
  const { name, image, slug, children } = category;
  const link = children.length > 0 ? `/categories/${slug}` : `/items/${slug}`;
  return (
    <Link className="w-full    overflow-hidden flex-col-start" href={link}>
      <Image
        alt="Hero Image"
        src={image!}
        width={500}
        height={500}
        className=" rounded-[5px] w-full min-h-[170px] h-[170px] object-cover"
      />
      <span className="p-[12px] text-black-500  h-full text-center w-full">
        {name}
      </span>
    </Link>
  );
};
