import { eCheck } from "@/components/helpers/functions";
import { ISeller, ISellerBase, ISellerFetched } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useUpdateAdminSeller = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      _id: string;
      status: ISellerFetched["status"];
    }) => await axios.put("/api/admin/sellers", data).then(eCheck),
    onSuccess: (data: ISellerFetched) => {
      queryClient.setQueriesData(
        {
          queryKey: ["sellers"],
        },
        (old: ISellerFetched[] | undefined) => {
          if (old) {
            return old.map((e) => (e._id === data._id ? data : e));
          }
          return [];
        }
      );
      queryClient.setQueriesData(
        {
          queryKey: ["seller", data._id],
        },
        data
      );
    },
  });
};
//get all sellers
export const useGetAdminSellers = (school: string) => {
  return useQuery({
    queryKey: ["sellers"],
    queryFn: async () =>
      await axios
        .get("/api/admin/sellers", {
          params: {
            school,
          },
        })
        .then(eCheck),
  });
};
//get seller by id
export const useGetSellerAdmin = (id: string) => {
  return useQuery<ISellerFetched>({
    queryKey: ["seller", id],
    queryFn: async () =>
      await axios
        .get("/api/admin/sellers/single", {
          params: {
            _id: id,
          },
        })
        .then(eCheck),
  });
};
