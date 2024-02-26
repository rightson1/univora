import { eCheck } from "@/components/helpers/functions";
import { IProductFetched, IProductWithSchool } from "@/types";
import { ec, sTime } from "@/utils/helpers";
import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";

//get newest arrivals
export const useGetNewestArrivals = (
  subdomain: string,
  initialData: IProductFetched[]
) => {
  return useQuery<IProductFetched[]>({
    queryKey: ["new_arrivals"],
    queryFn: async () =>
      await axios
        .get(`/api/client/products/new-arrivals`, {
          params: {
            school: subdomain,
          },
        })
        .then(eCheck),
    initialData,
    ...sTime(10),
  });
};
//products in a category
// export const useGetProductsInCategory = (
//   subdomain: string,
//   category_slug: string,
//   initialData: IProductFetched[]
// ) => {
//   return useQuery<IProductFetched[]>({
//     queryKey: ["products_in_category", category_slug],
//     queryFn: async () =>
//       await axios
//         .get(`/api/client/categories/products`, {
//           params: {
//             school: subdomain,
//             category: category_slug,
//           },
//         })
//         .then(eCheck),
//     initialData,
//     ...sTime(40),
//   });
// };

export const useGetProduct = (
  slug: string,
  initialData: IProductWithSchool
) => {
  return useQuery<IProductWithSchool>({
    queryKey: ["product", slug],
    queryFn: async () => {
      return await axios
        .get("/api/client/products/single", {
          params: {
            slug,
          },
        })
        .then(eCheck);
    },
    initialData,
    enabled: slug.length > 0,
    ...sTime(40),
  });
};
//pagination all products
// export const useGetAllProducts = ({
//   school,
//   search,
//   page,
//   limit,
// }: {
//   school: string;
//   search: string;
//   page: number;
//   limit: number;
// }) => {
//   return useQuery<IProductFetched[]>({
//     queryKey: ["all_products", page],
//     queryFn: async () =>
//       await axios
//         .get(`/api/client/products/all`, {
//           params: {
//             school,
//             search,
//             page,
//             limit,
//           },
//         })
//         .then(eCheck),
//     placeholderData: keepPreviousData,
//     ...sTime(40),
//   });
// };
//use get product bu search and school
// export const useGetProductsBySearch = ({
//   school,
//   search,
//   page,
// }: {
//   school: string;
//   search: string;
//   page: number;
// }) => {
//   return useQuery<IProductFetched[]>({
//     queryKey: ["products", school, search],
//     queryFn: async () => {
//       return await axios
//         .get("/api/client/products/search", {
//           params: {
//             school,
//             search,
//             page,
//           },
//         })
//         .then(eCheck);
//     },
//     enabled: search.length > 2,
//   });
// };

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
export const useGetAllProducts = ({
  school,
  limit,
}: {
  school: string;
  limit: number;
}) => {
  return useInfiniteQuery<IProductFetched[]>({
    initialPageParam: 1,
    queryKey: ["products_search_page"],
    queryFn: async ({ pageParam }) => {
      return await axios
        .get("/api/client/products/all", {
          params: {
            school,
            page: pageParam,
            limit,
          },
        })
        .then(eCheck);
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < limit) {
        return undefined;
      }
      return pages.length + 1;
    },
  });
};
// useGetProductsBySearch with infinite query
export const useGetProductsBySearch = ({
  school,
  search,
  limit,
}: {
  school: string;
  search: string;
  limit: number;
}) => {
  return useInfiniteQuery<IProductFetched[]>({
    initialPageParam: 1,
    queryKey: ["products_search", search],
    queryFn: async ({ pageParam }) => {
      return await axios
        .get("/api/client/products/search", {
          params: {
            school,
            search,
            page: pageParam,
            limit,
          },
        })
        .then(eCheck);
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < limit) {
        return undefined;
      }
      return pages.length + 1;
    },
  });
};

// export const useGetProductsInCategoryBySearch infinite query
export const useGetProductsInCategoryBySearch = ({
  school,
  category,
  search,
  limit,
}: {
  school: string;
  category: string;
  search: string;
  limit: number;
}) => {
  return useInfiniteQuery<IProductFetched[]>({
    initialPageParam: 1,
    queryKey: ["products_in_category_search", category, search],
    queryFn: async ({ pageParam }) => {
      return await axios
        .get("/api/client/categories/products/search", {
          params: {
            school,
            category: category,
            search,
            page: pageParam,
            limit,
          },
        })
        .then(eCheck);
    },
    enabled: search.length > 2,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < limit) {
        return undefined;
      }
      return pages.length + 1;
    },
  });
};

//export autocomeplete products on category
export const useAutoCompleteCategory = ({
  school,
  category,
  search,
}: {
  school: string;
  category: string;
  search: string;
}) => {
  return useQuery<IProductFetched[]>({
    queryKey: ["autoCompleteCategory", school, category, search],
    queryFn: async () => {
      return await axios
        .get("/api/client/categories/products/autocomplete", {
          params: {
            school,
            category,
            search,
          },
        })
        .then(eCheck);
    },
    enabled: search.length > 2,
  });
};

//use get products in category with infinite query
export const useGetProductsInCategory = ({
  school,
  category,
  limit,
}: {
  school: string;
  category: string;
  limit: number;
}) => {
  return useInfiniteQuery<IProductFetched[]>({
    initialPageParam: 1,
    queryKey: ["products_in_category", category],
    queryFn: async ({ pageParam }) => {
      return await axios
        .get("/api/client/categories/products/all", {
          params: {
            school,
            category,
            page: pageParam,
            limit,
          },
        })
        .then(eCheck);
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < limit) {
        return undefined;
      }
      return pages.length + 1;
    },
  });
};

//get products by seller
export const useGetProductsBySeller = (
  seller: string,
  initialData: IProductFetched[]
) => {
  return useQuery<IProductFetched[]>({
    queryKey: ["products_by_seller", seller],
    queryFn: async () =>
      await axios
        .get(`/api/client/products/seller`, {
          params: {
            seller,
          },
        })
        .then(eCheck),
    initialData,
    ...sTime(40),
  });
};

//add product to saved items
export const useAddProductToSaved = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { user: string; item: string }) =>
      await axios.post("/api/client/products/saved", data).then(eCheck),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["saved_items"],
      });
    },
  });
};

//get saved items
export const useGetSavedItems = (userId?: string) => {
  return useQuery<IProductFetched[]>({
    queryKey: ["saved_items", userId],
    queryFn: async () =>
      await axios
        .get(`/api/client/products/saved`, {
          params: {
            userId,
          },
        })

        .then(eCheck),

    enabled: !!userId,
  });
};
//delete product from saved items
export const useDeleteProductFromSaved = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { userId: string; item: string }) =>
      await axios.delete("/api/client/products/saved", {
        params: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["saved_items"],
      });
    },
  });
};
