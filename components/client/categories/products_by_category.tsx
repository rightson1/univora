"use client";
import { Input } from "@/components/ui/input";
import { ICategoryFetched, IProductFetched, ISchoolFetched } from "@/types";
import { useGetProductsInCategory } from "@/utils/hooks/client/useProducts";
import React, { useEffect } from "react";
import Fuse from "fuse.js";
import { Product_Card } from "../products_card";
export const Products_By_Category = ({
  category,
  products: initialData,
  school,
}: {
  category: ICategoryFetched;
  products: IProductFetched[];
  school: string;
}) => {
  const { data: products_raw } = useGetProductsInCategory(
    school,
    category.slug,
    initialData
  );
  const [products, setProducts] = React.useState<IProductFetched[]>(
    initialData || []
  );
  const [query, setQuery] = React.useState("");
  React.useEffect(() => {
    if (products_raw) {
      setProducts(products_raw);
    }
  }, [products_raw]);

  useEffect(() => {
    if (query && query?.length > 0) {
      //search based on name /brand

      const fuzzyQuery = new RegExp(query.split("").join(".*").toLowerCase());
      const includesFiltered = products.filter(
        (product) =>
          fuzzyQuery.test(product.name.toLowerCase()) ||
          fuzzyQuery.test((product.brand ?? "").toLowerCase()) ||
          product.tags?.some((tag) => fuzzyQuery.test(tag.toLowerCase()))
      );

      const remainingProducts = products.filter(
        (school) => !includesFiltered.includes(school)
      );
      const fuse = new Fuse(remainingProducts, {
        keys: ["name", "brand"],
        threshold: 0.4,
      });
      const fuseFiltered = fuse.search(query).map((res) => res.item);

      setProducts([...includesFiltered, ...fuseFiltered]);
    } else {
      setProducts(products_raw);
    }
  }, [query]);
  return (
    <div>
      <div className="flex gap-2 my-3 flex-col md:flex-row">
        <input
          className="  px-4 blr rounded-md  w-full outline-none py-2"
          placeholder="Search products"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="px-4 blr rounded-md  w-full  py-2 ">
          <span
            className={`outline-none border-none bg-none w-full bg-transparent p-2 text-start text-black-200`}
          >
            Filters
          </span>
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {products.map((product, index: number) => {
          return (
            <Product_Card
              key={index}
              id={product._id}
              slug={product.slug}
              price={product.price}
              description={product.description}
              image={product.thumbnail}
              title={product.name}
              imageStyles="w-full h-[150px] sm:h-[200px] object-cover  rounded-[5px]"
              descriptionStyles="p-size"
              imageSizes={{ width: 300, height: 300 }}
              button={false}
            />
          );
        })}
      </div>
    </div>
  );
};
