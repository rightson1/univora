import { IProduct } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useAddProduct = () => {
  return useMutation({
    mutationFn: async (productData: IProduct) => {
      return await axios.post("/api/seller/products", productData);
    },
  });
};
