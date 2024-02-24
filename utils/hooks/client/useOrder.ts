import { eCheck } from "@/components/helpers/functions";
import { IOrder, IOrderFetched } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderData: IOrder) => {
      return await axios.post("/api/client/orders", orderData).then(eCheck);
    },
    onSuccess: (order) => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};
