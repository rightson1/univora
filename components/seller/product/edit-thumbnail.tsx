"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MdDeleteOutline, MdEdit, MdOutlineMoreHoriz } from "react-icons/md";
import { CustomModal } from "../../shared/CustomModal";
import { ImageInput } from "../utils/image-input";
import Image from "next/image";

export const EditThumnnail = () => {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  return (
    <CustomModal
      title="Upload Thumbnail"
      trigger={
        <Button variant="outline" size={"icon"}>
          <MdEdit className="" />
        </Button>
      }
    >
      <form className="fx-c gap-5">
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
      </form>
    </CustomModal>
  );
};
