import { eCheck } from "@/components/helpers/functions";
import { IProduct, IProductFetched } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useAddProduct = () => {
  return useMutation({
    mutationFn: async (productData: IProduct) => {
      return await axios.post("/api/seller/products", productData).then(eCheck);
    },
  });
};
export const useGetProducts = (sellerId: string) => {
  return useQuery<IProductFetched[]>({
    queryKey: ["products", sellerId],
    queryFn: async () => {
      return await axios
        .get("/api/seller/products", {
          params: {
            sellerId,
          },
        })
        .then((res) => res.data);
    },
  });
};
//get single product
export const useGetSingleProduct = (_id: string) => {
  return useQuery<IProductFetched>({
    queryKey: ["product", _id],
    queryFn: async () => {
      return await axios
        .get("/api/seller/products/single", {
          params: {
            _id,
          },
        })
        .then(eCheck);
    },
  });
};
//update product
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      productData: Partial<IProduct> & {
        _id: string;
      }
    ): Promise<IProductFetched> => {
      return await axios
        .put("/api/seller/products/single", productData)
        .then(eCheck);
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["product", data._id],
      });
    },
  });
};
//delete product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productId: string) => {
      return await axios
        .delete("/api/seller/products/single", {
          params: {
            _id: productId,
          },
        })
        .then(eCheck);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};
//get single product

//auto complete

export const useAutoComplete = ({
  school,
  search,
}: {
  school: string;
  search: string;
}) => {
  return useQuery<IProductFetched[]>({
    queryKey: ["autoComplete", school, search],
    queryFn: async () => {
      return await axios
        .get("/api/client/products/autocomplete", {
          params: {
            school,
            search,
          },
        })
        .then(eCheck);
    },
    enabled: search.length > 2,
  });
};
//use get product bu search and school
export const useGetProductsBySearch = ({
  school,
  search,
  page,
}: {
  school: string;
  search: string;
  page: number;
}) => {
  return useQuery<IProductFetched[]>({
    queryKey: ["products", school, search],
    queryFn: async () => {
      return await axios
        .get("/api/client/products/search", {
          params: {
            school,
            search,
            page,
          },
        })
        .then(eCheck);
    },
    enabled: search.length > 2,
  });
};
