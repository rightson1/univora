import { Button } from "@/components/ui/button";
import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GoDotFill } from "react-icons/go";
import { EditGeneralInfo } from "@/components/seller/product/edit-general-info";
import { MdDeleteOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import Image from "next/image";
import { EditThumnnail } from "@/components/seller/product/edit-thumbnail";
import { EditMedia } from "@/components/seller/product/edit-media";
const EditProduct = () => {
  return (
    <div className="p-4">
      <button className="text-sm fc">
        <FaArrowLeftLong className="mr-2" />
        <span>Back To Products</span>
      </button>
      <div className="py-5 fx-c gap-5">
        <div className="flex gap-5 flex-col md:flex-row w-full">
          <div className="fx-c flex-[2] gap-5">
            <GeneralInfo />
            <Description />
          </div>
          <div className="fx-c flex-1 gap-5">
            <Tumbnail />
            <Media />
          </div>
        </div>
      </div>
    </div>
  );
};

const GeneralInfo = () => {
  return (
    <Card className="w-full ">
      <CardHeader className="mb:p-4">
        <div className="fb">
          <h4 className="h3 text-foreground">Winter Jacket</h4>
          <div className="fc">
            <Button variant="ghost" className="hidden md:flex">
              <GoDotFill className="mr-2 text-indigo" />
              Published
            </Button>
            <EditGeneralInfo />
          </div>
        </div>
        <CardDescription>
          A nice winter jacket for the cold weather.
        </CardDescription>
      </CardHeader>
      <CardContent className="fx-c gap-4 w-full ">
        <h4 className="h4">Details</h4>
        <div className="fx-c gap-5 w-full">
          <div className="fb w-full">
            <h5 className="p">Price:</h5>
            <span>
              <span className="text-foreground">ksh</span> 5000
            </span>
          </div>
          <div className="fb w-full">
            <h5 className="p">Category:</h5>
            <span>Winter Jacket</span>
          </div>
          <div className="fb w-full">
            <h5 className="p">Brand:</h5>
            <span>Winter Jacket</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
const Description = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Description</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            voluptatum, voluptate quidem, quas, dolorum quod voluptatem
            doloremque quia eum quibusdam atque. Quisquam, voluptates. Quisquam
            quibusdam, voluptatibus voluptas officiis, quod, voluptate
            voluptatum quia quae magnam quos fugit. Quisquam, voluptates.
            Quisquam quibusdam, voluptatibus voluptas officiis, quod, voluptate
            voluptatum quia quae magnam quos fugit.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
const Tumbnail = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="fb">
          <CardTitle>Thumbnail</CardTitle>
          <div className="flex gap-1">
            <EditThumnnail />
            <Button variant="outline" size={"icon"} className="text-indigo">
              <MdDeleteOutline className="text-destructive" />
            </Button>
          </div>
        </div>
        <CardDescription className="pt-5">
          <Image
            src="/imgs/3.png"
            width={200}
            height={200}
            alt="Image"
            className="w-16 object-cover  rounded-lg"
          />
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
const Media = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="fb">
          <CardTitle>Media</CardTitle>
          <div className="flex gap-1">
            <EditMedia />
          </div>
        </div>
        <CardDescription className="flex flex-wrap pt-5  gap-2">
          {[1, 2, 3].map((item) => (
            <Image
              src={`/imgs/${item}.png`}
              key={item}
              width={200}
              height={200}
              alt="Image"
              className="w-16 object-cover  rounded-lg"
            />
          ))}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default EditProduct;
