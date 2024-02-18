import { eCheck } from "@/components/helpers/functions";
import { ISeller, ISellerBase, ISellerFetched } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useGetAdminSellers = () => {
  return useQuery({
    queryKey: ["sellers"],
    queryFn: async () => await axios.get("/api/admin/sellers").then(eCheck),
  });
};
