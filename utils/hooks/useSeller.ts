import { ISeller, ISellerBase } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useAddSeller = () => {
  return useMutation({
    mutationFn: async (data: ISeller) =>
      await axios.post("/api/seller", data).then((res) => {
        if (!res.data.success) {
          throw new Error(res.data.message);
        }
      }),
  });
};
