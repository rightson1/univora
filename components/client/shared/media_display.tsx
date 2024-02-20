"use client";
import React from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
interface Props {
  image: string;
  gallery?: string[];
}
import Image from "next/image";
export const Media_Display = ({ image, gallery }: Props) => {
  const [images, setImages] = React.useState<string[]>([]);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (gallery) {
      setImages([...gallery, image]);
    }
  }, [gallery]);
  return (
    <div className="flex-col-start w-full gap-5">
      <Image
        src={image}
        alt="image"
        height={800}
        width={800}
        onClick={() => setOpen(true)}
        className="w-full  object-cover  mb:h-[300px] md:h-[400px]  cursor-pointer"
      />
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={
          images?.map((item) => ({
            src: item,
          })) || []
        }
      />
      <div className="flex gap-2 flex-wrap w-full ">
        {images?.map((item, index) => (
          <Image
            src={item}
            key={index}
            alt="image"
            onClick={() => setOpen(true)}
            height={300}
            width={300}
            className="rounded-sm object-cover h-[60px] w-[60px] cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
};
