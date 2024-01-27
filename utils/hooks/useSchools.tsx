import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ISchool, ISchoolFetched } from "@/types";

export const useAddSchool = () => {
  return useMutation({
    mutationFn: (school: ISchool) => axios.post("/api/s/schools", school),
  });
};

//fetch all schools
export const useGetSchools = () => {
  return useQuery<ISchoolFetched[]>({
    queryKey: ["schools"],
    queryFn: () => axios.get("/api/s/schools").then((res) => res.data),
    staleTime: 1000 * 60 * 60,
  });
};
