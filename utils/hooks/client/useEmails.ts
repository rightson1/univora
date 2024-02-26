import { eCheck } from "@/components/helpers/functions";
import { ISchoolFetched } from "@/types";
import { sTime } from "@/utils/helpers";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

//use send contact email
export const useSendContactEmail = () => {
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      message: string;
    }) => await axios.post("/api/client/contact", data).then(eCheck),
  });
};
