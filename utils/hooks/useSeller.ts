import { eCheck } from "@/components/helpers/functions";
import { ISeller, ISellerBase, ISellerFetched } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useAddSeller = () => {
  return useMutation({
    mutationFn: async (data: ISeller) =>
      await axios.post("/api/open/seller", data).then((res) => {
        if (!res.data.success) {
          throw new Error(res.data.message);
        }
      }),
  });
};
//update seller
export const useUpdateSeller = () => {
  return useMutation({
    mutationFn: async (
      data: Partial<ISellerFetched> & {
        _id: string;
      }
    ) => await axios.put("/api/seller", data).then(eCheck),
  });
};
//delete seller
export const useDeleteSeller = () => {
  const quertClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { _id: string }) =>
      await axios.delete("/api/seller", {
        data,
      }),
    onSuccess: () => {
      quertClient.invalidateQueries({
        queryKey: ["sellers"],
      });
    },
  });
};
