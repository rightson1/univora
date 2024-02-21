"use client";
import { Input } from "@/components/ui/input";
import { ICategoryFetched, IProductFetched, ISchoolFetched } from "@/types";
import {
  useAutoCompleteCategory,
  useGetProductsInCategory,
  useGetProductsInCategoryBySearch,
} from "@/utils/hooks/client/useProducts";
import React, { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { Product_Card } from "../products_card";
import { Auto_Complete } from "../search/auto_complete";
import { Search } from "lucide-react";
import { Product_cards } from "../shared/product_cards";
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
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { data: products_autocomplete } = useAutoCompleteCategory({
    search: query,
    school: school,
    category: category._id,
  });
  const { data, isFetchingNextPage, isFetching, fetchNextPage, hasNextPage } =
    useGetProductsInCategoryBySearch({
      school,
      category: category._id,
      search,
      limit: 15,
    });
  useEffect(() => {
    if (data) {
      const allProducts = data.pages.flatMap((page) => page);

      setProducts(allProducts);
    }
  }, [data]);
  useEffect(() => {
    if (!open && query) {
      setSearch(query);
    }
  }, [open]);
  return (
    <div className="py-5">
      <div className="fb w-full gap-2">
        <button
          className="fc  pl-4 product-card rounded-md py-2 w-full   h-[50px]"
          onClick={() => setOpen(true)}
        >
          <Search className="text-2xl text-indigo-300" />
          <div
            className={`outline-none border-none bg-none w-full flex items-start bg-transparent p-2`}
            onClick={() => setOpen(true)}
          >
            <span className="p-size opacity-75">
              {query || "Click to search"}
            </span>
          </div>
          <span
            className="fc   px-4 rounded-md p-2  h-[50px] text-indigo-300 hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              setQuery("");
            }}
          >
            Clear
          </span>
        </button>
      </div>
      <Auto_Complete
        {...{
          open,
          setOpen,
          query,
          school: school,
          setQuery,
          products: products_autocomplete,
        }}
      />
      {data || search ? (
        <div className="py-5">
          <Product_cards
            products={products}
            loading={data ? false : isFetching}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {products?.map((product, index: number) => {
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
      )}
    </div>
  );
};
