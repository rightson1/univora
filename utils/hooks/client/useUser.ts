import { IUser, IUserFetched } from "@/types/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

//edit user

export const useEditUser = () => {
  return useMutation({
    mutationFn: async ({
      ...user
    }: Partial<IUserFetched> & {
      _id: string;
    }) => await axios.put(`/api/client/users`, user),
  });
};
