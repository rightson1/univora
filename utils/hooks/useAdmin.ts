import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { IAdmin } from "@/types";
export const useAddAdmin = () => {
  return useMutation({
    mutationFn: async (data: IAdmin) => axios.post("/api/open/admins", data),
  });
};
