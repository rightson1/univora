import { eCheck } from "@/components/helpers/functions";
import { ICategoryFetched } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { sTime } from "@/utils/helpers";

//get featured categories with initial data
export const useFeaturedCategories = (initialData: ICategoryFetched[]) => {
  return useQuery<ICategoryFetched[]>({
    queryKey: ["featured-categories"],
    queryFn: async () =>
      axios.get("/api/client/categories?featured=true").then(eCheck),
    initialData,
    ...sTime(10),
  });
};

export const useGetSubcategories = (
  category_slug: string,
  initialData: ICategoryFetched[]
) => {
  return useQuery<ICategoryFetched[], string>({
    queryKey: ["subcategories", category_slug],
    queryFn: async () =>
      axios
        .get("/api/client/categories", {
          params: { category_slug },
        })
        .then(eCheck)
        .then((data) => {
          console.log(data);
          return data;
        }),
    ...sTime(10),
    initialData,
  });
};
//get single category
export const useGetCategory = (slug: string, initialData: ICategoryFetched) => {
  return useQuery<ICategoryFetched, string>({
    queryKey: ["category"],
    queryFn: async () =>
      axios.get("/api/client/categories", {
        params: { slug },
      }),
    initialData,
    ...sTime(10),
  });
};
