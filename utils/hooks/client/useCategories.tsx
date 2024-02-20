import { eCheck } from "@/components/helpers/functions";
import { ICategoryFetched } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

//get featured categories with initial data
export const useFeaturedCategories = (initialData: ICategoryFetched[]) => {
  return useQuery<ICategoryFetched[]>({
    queryKey: ["featured-categories"],
    queryFn: async () =>
      axios.get("/api/client/categories?featured=true").then(eCheck),
    initialData,
    initialDataUpdatedAt: Date.now(),
  });
};
