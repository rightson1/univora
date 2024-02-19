import { eCheck } from "@/components/helpers/functions";
import { ICategory, ICategoryFetched, TEdit } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

//use add Category
export const useAddCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addCategory"],
    mutationFn: (category: ICategory) =>
      axios.post("/api/s/categories", category).then(eCheck),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "populatedCategories",
      });
    },
  });
};

//use get Populated Categories
export const useGetPopulatedCategories = () => {
  return useQuery<ICategoryFetched[]>({
    queryKey: ["populatedCategories"],
    queryFn: () => axios.get("/api/s/categories").then((res) => res.data),
  });
};

export const useEditCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["editCategory"],
    mutationFn: (category: TEdit<ICategory>) =>
      axios.put("/api/s/categories", category),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "populatedCategories",
      });
    },
  });
};
//use delete category
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteCategory"],
    mutationFn: (_id: string) =>
      axios
        .delete("/api/s/categories", {
          params: { _id },
        })
        .then(eCheck),

    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "populatedCategories",
      });
    },
  });
};
