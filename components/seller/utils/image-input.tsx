"use client";
import React, { useState, DragEvent } from "react";

interface MultipleImageInputProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  multiple: true;
}

interface SingleImageInputProps {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  multiple?: false;
}

type ImageInputProps = MultipleImageInputProps | SingleImageInputProps;

export const ImageInput = (props: ImageInputProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.multiple) {
      props.setFiles(Array.from(event.target.files || []));
    } else {
      props.setFile(event.target.files?.[0] || null);
    }
  };

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();

    if (event.dataTransfer.items) {
      if (props.multiple) {
        let newFiles: File[] = [];
        for (var i = 0; i < event.dataTransfer.items.length; i++) {
          if (event.dataTransfer.items[i].kind === "file") {
            var file = event.dataTransfer.items[i].getAsFile();
            if (file) newFiles.push(file);
          }
        }
        props.setFiles(newFiles);
      } else {
        for (var i = 0; i < event.dataTransfer.items.length; i++) {
          if (event.dataTransfer.items[i].kind === "file") {
            var file = event.dataTransfer.items[i].getAsFile();
            props.setFile(file);
            break; // Only take the first file
          }
        }
      }
    }
  };

  return (
    <div
      className="border-2 border-dashed rounded-lg
       py-8 p-4 flex flex-col items-center justify-center w-full"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="fileInput"
        onChange={handleFileChange}
        multiple={props.multiple}
      />
      <label
        htmlFor="fileInput"
        className="flex flex-col items-center cursor-pointer"
      >
        <p className="p-sm md:max-w-1/2">
          <span>
            Drop your images here, or{" "}
            <span className="text-violet-500">click to browse</span>
          </span>{" "}
          1200 x 1600 (3:4) recommended, up to 10MB each
        </p>
      </label>
    </div>
  );
};
