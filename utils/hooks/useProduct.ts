import { IProduct, IProductFetched } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useAddProduct = () => {
  return useMutation({
    mutationFn: async (productData: IProduct) => {
      return await axios.post("/api/seller/products", productData);
    },
  });
};
export const useGetProducts = (sellerId?: string) => {
  return useQuery<IProductFetched[]>({
    queryKey: ["products", sellerId],
    queryFn: async () => {
      return await axios
        .get("/api/seller/products", {
          params: {
            sellerId,
          },
        })
        .then((res) => res.data);
    },
  });
};
