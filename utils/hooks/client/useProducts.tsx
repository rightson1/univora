import { eCheck } from "@/components/helpers/functions";
import { IProductFetched } from "@/types";
import { ec, sTime } from "@/utils/helpers";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

//get newest arrivals
export const useGetNewestArrivals = (
  subdomain: string,
  initialData: IProductFetched[]
) => {
  return useQuery<IProductFetched[]>({
    queryKey: ["new_arrivals"],
    queryFn: async () =>
      await axios
        .get(`/api/client/products/new-arrivals`, {
          params: {
            school: subdomain,
          },
        })
        .then(eCheck),
    initialData,
    ...sTime(10),
  });
};
//products in a category
export const useGetProductsInCategory = (
  subdomain: string,
  category_slug: string,
  initialData: IProductFetched[]
) => {
  return useQuery<IProductFetched[]>({
    queryKey: ["products_in_category", category_slug],
    queryFn: async () =>
      await axios
        .get(`/api/client/categories/products`, {
          params: {
            school: subdomain,
            category: category_slug,
          },
        })
        .then(eCheck),
    initialData,
    ...sTime(40),
  });
};

export const useGetProduct = (slug: string, initialData: IProductFetched) => {
  return useQuery<IProductFetched>({
    queryKey: ["product", slug],
    queryFn: async () => {
      return await axios
        .get("/api/client/products/single", {
          params: {
            slug,
          },
        })
        .then(eCheck);
    },
    initialData,
    ...sTime(40),
  });
};
