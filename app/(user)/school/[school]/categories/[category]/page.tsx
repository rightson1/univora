import { Sub_Categories } from "@/components/client/categories/subcategories";
import { getSingleCategory, getSubCategories } from "@/utils/api";
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
  return (
    <section className="pad-x pt-10">
      <h1 className="h2-size text-indigo-500">{`Home >${category?.name} `}</h1>
      <Sub_Categories categories={categories} parent_slug={category_slug} />;
    </section>
  );
};

export default Page;
