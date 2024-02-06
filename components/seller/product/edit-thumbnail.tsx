"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MdDeleteOutline, MdEdit, MdOutlineMoreHoriz } from "react-icons/md";
import { CustomModal } from "../../shared/CustomModal";
import { ImageInput } from "../utils/image-input";
import Image from "next/image";
import { IProduct } from "@/types";
import { IProductEdit } from "@/types/sellerTypes";
import { useUpdateProduct } from "@/utils/hooks/useProduct";
import {
  deleteFile,
  toSlug,
  uploadFile,
  useCustomToast,
} from "@/components/helpers/functions";
import { useSellerAuth } from "@/utils/sellerAuth";

export const EditThumbnail = ({ product }: IProductEdit) => {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const { seller } = useSellerAuth();
  const { loading, customToast, modalOpen, setModalOpen } = useCustomToast();
  const { mutateAsync } = useUpdateProduct();
  const handleThumbnail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (thumbnail) {
      let url = "";
      customToast({
        func: async () => {
          await deleteFile(product.thumbnail);
          url = await uploadFile(
            thumbnail,
            `${toSlug(seller._id)}/products/${product.slug}/thumbnail`
          );
          await mutateAsync({
            _id: product._id,
            thumbnail: url,
          });
          setThumbnail(null);
        },
        efunc: async () => {
          await deleteFile(url);
        },
      });
    }
  };
  return (
    <CustomModal
      title="Upload Thumbnail"
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      onSubmit={handleThumbnail}
      disableSubmit={loading}
      trigger={
        <Button variant="outline" size={"icon"}>
          <MdEdit className="" />
        </Button>
      }
    >
      <div className="fx-c gap-5 py-10">
        <div className="fx-c">
          <h6 className="h6">Thumbnail</h6>
          <p className="p-sm">
            Used to represent your product during checkout, social sharing and
            more.
          </p>
        </div>
        <ImageInput file={thumbnail} setFile={setThumbnail} />
        {thumbnail && (
          <div className="fb w-full">
            <Image
              src={URL.createObjectURL(thumbnail)}
              width={200}
              height={200}
              alt="Image"
              className="h-30 object-cover  rounded-lg"
            />
            <Button
              variant="ghost"
              size={"icon"}
              onClick={() => setThumbnail(null)}
            >
              <MdDeleteOutline className="text-destructive text-xl" />
            </Button>
          </div>
        )}
      </div>
    </CustomModal>
  );
};
