import { eCheck } from "@/components/helpers/functions";
import { ISchoolFetched } from "@/types";
import { sTime } from "@/utils/helpers";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

//fetch school by  subdomain
export const useGetSchool = (subdomain: string) => {
  return useQuery<ISchoolFetched>({
    queryKey: ["school", subdomain],
    queryFn: async () =>
      await axios
        .get("/api/client/schools", {
          params: {
            subdomain: subdomain,
          },
        })
        .then(eCheck),
    //stale time 2 days
    staleTime: 1000 * 60 * 60 * 24 * 2,
  });
};
//with initial data
export const useGetSchoolWithInitialData = (
  subdomain: string,
  initialData: ISchoolFetched
) => {
  return useQuery<ISchoolFetched>({
    queryKey: ["school", subdomain],
    queryFn: async () =>
      await axios.get("/api/client/schools", {
        params: {
          subdomain: subdomain,
        },
      }),
    initialData: initialData,
    ...sTime(300),
  });
};
