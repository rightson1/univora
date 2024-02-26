"use client";
import { Auto_Complete } from "@/components/client/search/auto_complete";
import { Product_cards } from "@/components/client/shared/product_cards";
import { Button } from "@/components/ui/button";
import { IProductFetched, TPageProps } from "@/types";
import { getSchool } from "@/utils/api";
import {
  useAutoComplete,
  useGetAllProducts,
  useGetProductsBySearch,
} from "@/utils/hooks/client/useProducts";
import { Search } from "lucide-react";
import { Metadata, ResolvingMetadata } from "next";
import React, { useEffect, useState } from "react";
export const Search_Page = ({ school_slug }: { school_slug: string }) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const {
    data: products_search,
    fetchNextPage: next,
    hasNextPage: nextExists,
    isFetchingNextPage: nextFetching,
    isFetching: fetching,
  } = useGetProductsBySearch({
    school: school_slug,
    search,
    limit: 15,
  });
  const { data, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage } =
    useGetAllProducts({
      school: school_slug,
      limit: 15,
    });

  useEffect(() => {
    if (!open && query.length > 2) {
      setSearch(query);
    }
  }, [open]);
  useEffect(() => {
    if (products_search) {
      const all_products = products_search.pages.flatMap((page) => page);
      setProducts(all_products);
    }
  }, [products_search]);

  const [products, setProducts] = useState<IProductFetched[] | undefined>();

  useEffect(() => {
    if (data) {
      const allProducts = data.pages.flatMap((page) => page);
      setProducts(allProducts);
    }
  }, [data]);
  const { data: products_autocomplete, isInitialLoading } = useAutoComplete({
    search: query,
    school: school_slug,
  });
  return (
    <section className="pad-x  flex-col gap-4 flex md:mt-[100px]">
      <h1 className="h2-size text-indigo-500">Search For Items</h1>
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
          school: school_slug,
          setQuery,
          products: products_autocomplete,
        }}
      />
      {products_search || search ? (
        <div className="py-5">
          <Product_cards
            products={products}
            loading={products_search ? false : fetching}
            fetchNextPage={next}
            hasNextPage={nextExists}
            isFetchingNextPage={nextFetching}
          />
        </div>
      ) : (
        <div className="py-5">
          <Product_cards
            products={products}
            loading={isLoading}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </div>
      )}
    </section>
  );
};
