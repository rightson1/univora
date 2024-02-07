import { ICategoryFetched } from "@/types";
import { storage } from "@/utils/firebase";
import { AxiosResponse } from "axios";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useState } from "react";
import toast from "react-hot-toast";

export const useCustomToast = () => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const customToast = ({
    func,
    sfunc,
    loading,
    suc,
    err,
    efunc,
  }: {
    func: () => Promise<any>;
    sfunc?: () => void;
    loading?: string;
    suc?: string;
    err?: string;
    efunc?: (() => Promise<void>) | (() => void);
  }) => {
    setModalOpen(true);
    setLoading(true);
    return toast.promise(
      func()
        .then((res) => {
          const data = res?.data;
          if (data && data.success === false) {
            throw new Error(data.message);
          }
          setLoading(false);
          setModalOpen(false);
          if (sfunc) sfunc();
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
          if (efunc) efunc();
          throw e;
        }),

      {
        loading: loading || "Loading...",
        success: suc || "Success",
        error: (e) => {
          setTimeout(() => {
            toast.dismiss();
          }, 3000);
          return e.message || err || "An error occurred";
        },
      }
    );
  };
  return { customToast, loading, modalOpen, setModalOpen };
};
export const toSlug = (str: string) => {
  return str.toLocaleLowerCase().replace(/\s/g, "-");
};
export const uploadFile = (file: File, name: string) => {
  const fileRef = ref(storage, `/${name}`);
  return uploadBytes(fileRef, file)
    .then((res) => getDownloadURL(res.ref))
    .catch((err) => {
      console.error(err);
      throw err;
    });
};
export const deleteFile = async (url: string) => {
  try {
    const deleteRef = ref(storage, url);
    await deleteObject(deleteRef).then(() => {
      return true;
    });
  } catch (err) {
    console.log(err);
    return true;
  }
};
export const flattenCategories = (
  categories: ICategoryFetched[]
): ICategoryFetched[] => {
  return categories.reduce(
    (acc: ICategoryFetched[], category: ICategoryFetched) => {
      if (category.children) {
        return [...acc, category, ...flattenCategories(category.children)];
      } else {
        return [...acc, category];
      }
    },
    []
  );
};

export const getStr = (pType?: string, str1?: string, str2?: string) => {
  if (!pType) {
    return str1 || str2 || "product";
  }
  if (pType === "product") {
    return str1 || "product";
  } else {
    return str2 || "service";
  }
};

export const eCheck = (res: AxiosResponse<any, any>) => {
  const data = res.data;
  if (data && data.success === false) {
    throw new Error(data.message);
  }
  return data;
};
