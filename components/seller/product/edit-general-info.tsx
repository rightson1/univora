"use client";
import React, { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { Textarea } from "@/components/ui/textarea";
import { Editor } from "../utils/Editor";
import { CustomModal } from "../../shared/CustomModal";
import { IProductEdit } from "@/types/sellerTypes";
import { IProductFetched, InputChangeEventTypes } from "@/types";
import { Product_Category } from "./product_category";
import { useUpdateProduct } from "@/utils/hooks/useProduct";
import { useCustomToast } from "@/components/helpers/functions";
export const EditGeneralInfo = ({ product }: IProductEdit) => {
  const [values, setValues] = useState<Partial<IProductFetched>>({
    name: product.name,
    price: product.price,
    description: product.description,
    brand: product.brand,
  });
  const [longDescription, setLongDescription] = useState<string>(
    product.longDescription || ""
  );
  const handleChange = (e: ChangeEvent<InputChangeEventTypes>) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };
  const [category, setCategory] = useState<string>("");
  const { mutateAsync } = useUpdateProduct();
  const { customToast, loading } = useCustomToast();
  const updateGeneralInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    customToast({
      func: async () => {
        await mutateAsync({
          _id: product._id,
          ...values,
          longDescription,
          category,
        });
      },
    });
  };
  return (
    <CustomModal
      title="Edit General Information"
      disableSubmit={loading}
      onSubmit={updateGeneralInfo}
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
            <Input
              id="name"
              placeholder="Name of your product"
              onChange={handleChange}
              value={values.name}
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Price</Label>
            <Input
              id="price"
              placeholder="Price of your product"
              type="number"
              value={values.price}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col space-y-1.5 md:col-span-2">
            <Label htmlFor="shortDescription">Short Description</Label>
            <Textarea
              id="description"
              value={values.description}
              onChange={handleChange}
              placeholder="
                  A small description of your product"
            />
          </div>

          <Product_Category
            category={category}
            setCategory={setCategory}
            product={product}
          />

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="brand">Brand</Label>
            <Input
              value={values.brand}
              onChange={handleChange}
              id="brand"
              placeholder="Brand of your product in Kg"
            />
          </div>
          <div className="flex flex-col space-y-1.5 md:col-span-2">
            <Label htmlFor="shortDescription">Description</Label>
            <Editor
              setEditorContent={setLongDescription}
              editorContent={longDescription}
            />
          </div>
        </div>
      </form>
    </CustomModal>
  );
};
