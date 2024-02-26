import { Products_By_Category } from "@/components/client/categories/products_by_category";
import { Custom_Breadcrumb } from "@/components/client/shared/atoms";
import Item_not_found from "@/components/shared/item_not_found";
import { TPageProps } from "@/types";
import { getProductsInCategory, getSingleCategory } from "@/utils/api";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";

const Category = async ({
  params: { category: category_slug, school },
}: {
  params: {
    category: string;
    school: string;
  };
}) => {
  const [category, products] = await Promise.all([
    getSingleCategory(category_slug),
    getProductsInCategory(school, category_slug),
  ]);
  if (!category)
    return (
      <Item_not_found ptxt="Category not found" link="/" btxt="Go back home" />
    );

  return (
    <section className="pad-x pt-5">
      <Custom_Breadcrumb
        items={[
          { name: "Home", link: "/" },
          { name: category?.name || "", link: `/category/${category_slug}` },
        ]}
      />
      <Products_By_Category
        category={category}
        products={products}
        school={school}
      />
    </section>
  );
};
export async function generateMetadata(
  { params: { category: category_slug }, searchParams }: TPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const [category] = await Promise.all([getSingleCategory(category_slug)]);

  const title = category?.name || "Category"; // If category name is not available, default to "Category"
  const description = `Explore products in the ${title} category`; // You can customize the description as needed

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: "en_US",
      type: "website",
    },
  };
}

export default Category;
