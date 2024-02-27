import { eCheck } from "@/components/helpers/functions";
import { IProduct, IProductFetched } from "@/types";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import axios from "axios";
import { sonner } from "../helpers";
import { useSellerAuth } from "../sellerAuth";

export const useAddProduct = () => {
  const { s_link } = useSellerAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productData: IProduct): Promise<IProductFetched> => {
      return await axios.post("/api/seller/products", productData).then(eCheck);
    },
    onSuccess: (data) => {
      sonner(`Preview Product`, {
        description: `View your product as your customers would see it.`,
        action: {
          label: "Preview",
          onClick: () => {
            window.open(`${s_link}/products/${data.slug}`, "_blank");
          },
        },
      });
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};
export const useGetProducts = (sellerId: string) => {
  return useQuery<IProductFetched[]>({
    queryKey: ["products"],
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
  const { s_link } = useSellerAuth();
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
      sonner(`Preview Changes`, {
        description: `Images might take a few seconds to update`,
        action: {
          label: "Preview",
          onClick: () => {
            window.open(`${s_link}/products/${data.slug}`, "_blank");
          },
        },
      });
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
