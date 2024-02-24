import { useMutation } from "@tanstack/react-query";
import axios from "axios";

//edit user

export const useEditUser = () => {
  return useMutation({
    mutationFn: async (user: { _id: string; name: string; phone: string }) =>
      await axios.put(`/api/client/users/${user._id}`, user),
  });
};
