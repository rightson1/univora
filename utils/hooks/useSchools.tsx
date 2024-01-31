import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ISchool, ISchoolFetched } from "@/types";

export const useAddSchool = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (school: ISchool) => axios.post("/api/s/schools", school),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["schools"],
      });
    },
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
export const useGetSchoolsOpen = () => {
  return useQuery<ISchoolFetched[]>({
    queryKey: ["schools"],
    queryFn: () => axios.get("/api/open/schools").then((res) => res.data),
    staleTime: 1000 * 60 * 60,
  });
};

//update school
export const useUpdateSchool = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (school: Partial<ISchoolFetched>) =>
      axios.put(`/api/s/schools`, school),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["schools"],
      });
    },
  });
};
