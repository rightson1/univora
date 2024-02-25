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
//get orders by user
export const useGetOrders = (user_id: string | undefined) => {
  return useQuery<IOrderFetched[], Error>({
    queryKey: ["orders", user_id],
    enabled: !!user_id,
    queryFn: async () => {
      return await axios
        .get(`/api/client/orders`, {
          params: {
            user_id: user_id,
          },
        })
        .then(eCheck);
    },
  });
};
