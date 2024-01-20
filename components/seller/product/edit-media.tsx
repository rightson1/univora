"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MdDeleteOutline, MdEdit, MdOutlineMoreHoriz } from "react-icons/md";
import { CustomModal } from "../utils/CustomModal";
import { ImageInput } from "../utils/image-input";
import Image from "next/image";

export const EditMedia = () => {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <CustomModal
      title="Upload Image"
      trigger={
        <Button variant="outline" size={"icon"}>
          <MdEdit className="" />
        </Button>
      }
    >
      <div className="fx-c gap-5">
        <div className="fx-c">
          <h6 className="h6">Image</h6>
          <p className="p-sm">
            Used to represent your product during checkout, social sharing and
            more.
          </p>
        </div>
        <ImageInput multiple files={files} setFiles={setFiles} />

        {files.map((file, i) => (
          <div className="fb w-full" key={i}>
            <Image
              src={URL.createObjectURL(file)}
              width={200}
              height={200}
              alt="Image"
              className="h-30 object-cover  rounded-lg"
            />
            <Button
              variant="ghost"
              size={"icon"}
              onClick={() => {
                setFiles(files.filter((_, index) => index !== i));
              }}
            >
              <MdDeleteOutline className="text-destructive text-xl" />
            </Button>
          </div>
        ))}
      </div>
    </CustomModal>
  );
};
