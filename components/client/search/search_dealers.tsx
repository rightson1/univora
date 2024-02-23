"use client";
import { ISellerFetched, UserProfileProps } from "@/types";
import { useGetSellers } from "@/utils/hooks/client/useSellers";
import { Search } from "lucide-react";
import React from "react";
import { T_Input } from "./trasparent_input";
import fuzzysort from "fuzzysort";
import { Sellers_Cards } from "../shared/Sellers";

export const Seller_Container = ({
  sellers: sellers_raw,
  subdomain,
}: {
  subdomain: string;
  sellers: ISellerFetched[];
}) => {
  const [search, setSearch] = React.useState("");

  const { data: sellers_fetched } = useGetSellers(subdomain, sellers_raw);
  const [sellers, setSellers] =
    React.useState<ISellerFetched[]>(sellers_fetched);
  React.useEffect(() => {
    if (search.length > 0) {
      const results = fuzzysort.go(search.toLowerCase(), sellers_fetched, {
        key: "name",
      });
      const filtered = results.map((result) => result.obj);
      setSellers(filtered);
    } else {
      setSellers(sellers_fetched);
    }
  }, [search, sellers_fetched]);
  return (
    <div>
      <div className="fc  px-4 product-card rounded-full p-2 w-full ">
        <Search className="text-2xl text-indigo-300" />
        <T_Input
          handleChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search"
          sx="bg-transparent w-full p-2"
        />
      </div>
      <div className="mt-10">
        <Sellers_Cards
          sellers={sellers}
          notFoundText="What the hell did you just search?"
        />
      </div>
    </div>
  );
};
