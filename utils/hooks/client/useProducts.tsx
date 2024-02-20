import { eCheck } from "@/components/helpers/functions";
import { IProductFetched } from "@/types";
import { ec } from "@/utils/helpers";
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
    initialDataUpdatedAt: Date.now(),
  });
};
