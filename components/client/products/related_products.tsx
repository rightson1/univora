import { IProductFetched } from "@/types";
import { useGetProductsBySearch } from "@/utils/hooks/client/useProducts";
import React, { useEffect } from "react";
import { Product_cards } from "../shared/product_cards";

export const Related = ({ product }: { product: IProductFetched }) => {
  const [products, setProducts] = React.useState<
    IProductFetched[] | undefined
  >();
  const {
    data: products_search,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
  } = useGetProductsBySearch({
    school: product.school,
    search: product.name,
    limit: 8,
  });
  useEffect(() => {
    if (products_search) {
      const all_products = products_search.pages.flatMap((page) => page);
      const filtered = all_products.filter((p) => p._id !== product._id);
      setProducts(filtered);
    }
  }, [products_search]);

  return (
    <div>
      <div className="py-5">
        <Product_cards
          products={products}
          loading={isFetching}
          fetchNextPage={fetchNextPage}
          hasNextPage={false}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </div>
  );
};
