import { eCheck } from "@/components/helpers/functions";
import { IOrder, IOrderFetched } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: async (orderData: IOrder) => {
      return await axios.post("/api/seller/orders", orderData).then(eCheck);
    },
  });
};
export const useGetOrders = (sellerId?: string) => {
  return useQuery<IOrderFetched[]>({
    queryKey: ["orders", sellerId],
    queryFn: async () => {
      return await axios
        .get("/api/seller/orders", {
          params: {
            sellerId,
          },
        })
        .then((res) => res.data);
    },
  });
};
//get single order
export const useGetSingleOrder = (_id: string) => {
  return useQuery<IOrderFetched>({
    queryKey: ["order", _id],
    queryFn: async () => {
      return await axios
        .get("/api/seller/orders/single", {
          params: {
            _id,
          },
        })
        .then((res) => res.data);
    },
  });
};
//update order
export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      orderData: Partial<IOrder> & {
        _id: string;
      }
    ): Promise<IOrderFetched> => {
      return await axios
        .put("/api/seller/orders/single", orderData)
        .then(eCheck);
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      queryClient.invalidateQueries({
        queryKey: ["order", data._id],
      });
    },
  });
};
//delete order
export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderId: string) => {
      return await axios
        .delete("/api/seller/orders/single", {
          params: {
            _id: orderId,
          },
        })
        .then(eCheck);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};
