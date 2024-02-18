import { eCheck } from "@/components/helpers/functions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { IProductFetched } from "@/types";
//get products by seller
export function useGetProductsAdmin(business: string) {
  return useQuery<IProductFetched[]>({
    queryKey: ["products", business],
    queryFn: async () => {
      const { data } = await axios.get(`/api/admin/products`, {
        params: {
          seller: business,
        },
      });
      return data;
    },
  });
}
