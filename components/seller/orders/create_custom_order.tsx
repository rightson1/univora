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
import { IOrder, IProductFetched, InputChangeEventTypes } from "@/types";

import { useUpdateProduct } from "@/utils/hooks/useProduct";
import { useCustomToast } from "@/components/helpers/functions";
import { useSellerAuth } from "@/utils/sellerAuth";
import { useCreateOrder } from "@/utils/hooks/useOrder";
export const Create_Custom_Order = () => {
  const { seller } = useSellerAuth();
  const [values, setValues] = useState();

  //   const handleChange = (e: ChangeEvent<InputChangeEventTypes>) => {
  //     setValues({ ...values, [e.target.id]: e.target.value });
  //   };
  const { mutateAsync } = useCreateOrder();
  const { customToast, loading } = useCustomToast();
  const updateGeneralInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    customToast({
      func: async () => {},
    });
  };
  return (
    <CustomModal
      title="Create Custome Order"
      disableSubmit={loading}
      onSubmit={updateGeneralInfo}
      trigger={<Button>Create Order</Button>}
    >
      <div className="grid grid-cols-1  w-full  gap-4">
        <div className="flex flex-col space-y-1.5 ">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Customer Name" className="w-full" />
        </div>

        {/* <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Price</Label>
            <Input
              id="price"
              placeholder="Price of your product"
              type="number"
              value={values.price}
              onChange={handleChange}
            />
          </div> */}
        {/* <div className="flex flex-col space-y-1.5 md:col-span-2">
            <Label htmlFor="shortDescription">Short Description</Label>
            <Textarea
              id="description"
              value={values.description}
              onChange={handleChange}
              placeholder="
                  A small description of your product"
            />
          </div> */}

        {/* <div className="flex flex-col space-y-1.5">
            <Label htmlFor="brand">Brand</Label>
            <Input
              value={values.brand}
              onChange={handleChange}
              id="brand"
              placeholder="Brand of your product in Kg"
            />
          </div>
           */}
      </div>
    </CustomModal>
  );
};
