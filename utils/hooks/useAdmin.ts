import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IAdmin, IAdminFetched } from "@/types";
import { eCheck } from "@/components/helpers/functions";
export const useAddAdmin = () => {
  return useMutation({
    mutationFn: async (data: IAdmin) =>
      axios.post("/api/open/admins", data).then(eCheck),
  });
};
//get all admins
export const useGetAdmins = () => {
  return useQuery<IAdminFetched[]>({
    queryKey: ["admins"],
    queryFn: async () => {
      const { data } = await axios.get("/api/s/admins");
      return data;
    },
  });
};

export const useEditAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      _id: string;
      status: IAdminFetched["status"];
    }) => axios.put("/api/s/admins", data).then(eCheck),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admins"],
      });
    },
  });
};
