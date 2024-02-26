import { Sub_Categories } from "@/components/client/categories/subcategories";
import Item_not_found from "@/components/shared/item_not_found";
import { TPageProps } from "@/types";
import { getSingleCategory, getSubCategories } from "@/utils/api";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";
const Page = async ({
  params: { category: category_slug },
}: {
  params: {
    category: string;
  };
}) => {
  const [categories, category] = await Promise.all([
    getSubCategories(category_slug),
    getSingleCategory(category_slug),
  ]);
  if (!category)
    return (
      <Item_not_found ptxt="Category not found" link="/" btxt="Go back home" />
    );
  return (
    <section className="pad-x pt-10">
      <h1 className="h2-size text-indigo-500">{`Home >${category?.name} `}</h1>
      <Sub_Categories categories={categories} parent_slug={category_slug} />
    </section>
  );
};
export async function generateMetadata(
  { params: { category: category_slug }, searchParams }: TPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const [parentCategory] = await Promise.all([
    getSingleCategory(category_slug),
  ]);

  const title = parentCategory?.name || "Categories"; // If parentCategory is not available, default to "Categories"
  const description = `Explore ${title} and find products from various sub-categories`; // You can customize the description as needed

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default Page;
