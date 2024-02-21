"use client";
import { Auto_Complete } from "@/components/client/search/auto_complete";
import { Product_cards } from "@/components/client/shared/product_cards";
import { useGetProductsBySearch } from "@/utils/hooks/useProduct";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
const Page = ({
  params,
}: {
  params: {
    school: string;
  };
}) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { data: products, isInitialLoading } = useGetProductsBySearch({
    school: params.school,
    search,
    page,
  });
  console.log(products);
  useEffect(() => {
    if (!open && query) {
      setSearch(query);
    }
  }, [open]);

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
          school: params.school,
          setQuery,
        }}
      />
      <div className="py-5">
        <Product_cards products={products} loading={isInitialLoading} />
      </div>
    </section>
  );
};

export default Page;
