import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { Textarea } from "@/components/ui/textarea";
import { Editor } from "../utils/Editor";
import { CustomModal } from "../utils/CustomModal";
export const EditGeneralInfo = () => {
  return (
    <CustomModal
      title="Edit General Information"
      trigger={
        <Button size="icon" variant={"ghost"}>
          <MdOutlineMoreHoriz className="text-xl" />
        </Button>
      }
    >
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full  gap-4">
          <div className="flex flex-col space-y-1.5 ">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Name of your product" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Price</Label>
            <Input
              id="price"
              placeholder="Price of your product"
              type="number"
            />
          </div>
          <div className="flex flex-col space-y-1.5 md:col-span-2">
            <Label htmlFor="shortDescription">Short Description</Label>
            <Textarea
              id="shortDescription"
              placeholder="
                  A small description of your product"
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="category">Category *</Label>
            <Input
              type="number"
              id="category"
              placeholder="Category of your product in Kg"
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="brand">Brand</Label>
            <Input
              type="number"
              id="brand"
              placeholder="Brand of your product in Kg"
            />
          </div>
          <div className="flex flex-col space-y-1.5 md:col-span-2">
            <Label htmlFor="shortDescription">Description</Label>
            <Editor />
          </div>
        </div>
      </form>
    </CustomModal>
  );
};
