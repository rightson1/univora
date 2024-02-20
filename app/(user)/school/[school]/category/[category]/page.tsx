import { Products_By_Category } from "@/components/client/categories/products_by_category";
import { Custom_Breadcrumb } from "@/components/client/shared/atoms";
import { getProductsInCategory, getSingleCategory } from "@/utils/api";
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

export default Category;
