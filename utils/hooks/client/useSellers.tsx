import { eCheck } from "@/components/helpers/functions";
import { ISellerFetched } from "@/types";
import { ec } from "@/utils/helpers";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { sTime } from "@/utils/helpers";

export const useGetLatestSellers = (
  subdomain: string,
  initialData: ISellerFetched[]
) => {
  return useQuery<ISellerFetched[]>({
    queryKey: ["new_sellers"],
    queryFn: async () =>
      await axios
        .get(`/api/client/sellers/latest`, {
          params: {
            school: subdomain,
          },
        })
        .then(eCheck),
    initialData,
    ...sTime(10),
  });
};

//all sellers
export const useGetSellers = (
  subdomain: string,
  initialData: ISellerFetched[]
) => {
  return useQuery<ISellerFetched[]>({
    queryKey: ["sellers"],
    queryFn: async () =>
      await axios
        .get(`/api/client/sellers`, {
          params: {
            school: subdomain,
          },
        })
        .then(eCheck),
    initialData,
    ...sTime(10),
  });
};
