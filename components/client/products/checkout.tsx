"use client";
import { IProductFetched, IVariantFetched } from "@/types";
import { useGetProduct } from "@/utils/hooks/client/useProducts";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUser } from "@/utils/userAuth";
import { hasVariants } from "@/app/api/utils/funcs";
import toast from "react-hot-toast";
import { Checkbox } from "@/components/ui/checkbox";
export const Checkout_Form = ({
  product,
  variant,
}: {
  product: IProductFetched;
  variant?: IVariantFetched;
}) => {
  const submit = (e: React.FormEvent<HTMLFormElement>) => {};
  const { handleSignIn, loggedIn, user } = useUser();
  const [open, setOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  useEffect(() => {
    if (user) {
      setUserDetails({
        name: user.displayName || "",
        email: user.email || "",
        phone: user.phone || "",
        message: "",
      });
    }
  }, [user]);

  const handleChanges = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  if (!user) {
    return toast.error("Please sign in to continue");
  }
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="w-full"
          onClick={() => {
            if (hasVariants(product) && !variant) {
              return toast.error("Please select a variant");
            }
            if (loggedIn) {
              setOpen(true);
            } else {
              handleSignIn();
            }
          }}
        >
          Checkout
        </Button>
      </DialogTrigger>
      <DialogContent
        // asChild
        close={false}
        className="
        max-w-[90vw] sm:max-w-[600px]
        "
      >
        <form
          className=" mb:max-h-[80vh] 
    max-h-[90vh] rounded-md md:p-4 flex flex-col"
        >
          <DialogHeader>
            <DialogTitle>Billing Information</DialogTitle>
            <DialogDescription>Enter your billing details</DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto flex-grow px-2 py-5">
            <div className="mt-5 ">
              <div>
                <div className="cols-2  w-full mt-5 ">
                  <div className="flex-col-start gap-2 col-span-2 md:col-span-1">
                    <label htmlFor="name">Name*</label>
                    <input
                      type="text"
                      value={userDetails.name}
                      name="name"
                      id="name"
                      className="w-full p-2 border-2 border-black-400  outline-none"
                      required
                      onChange={handleChanges}
                    />
                  </div>
                  <div className="flex-col-start gap-2 w-full col-span-2 md:col-span-1">
                    <label htmlFor="email">Email*</label>
                    <input
                      type="email"
                      name="email"
                      value={userDetails.email}
                      id="email"
                      className="w-full p-2 border-2 border-black-400 outline-none"
                      required
                      onChange={handleChanges}
                    />
                  </div>
                  <div className="flex-col-start gap-2 w-full  col-span-2">
                    <label htmlFor="phone">Phone*</label>
                    <input
                      type="tel"
                      value={userDetails.phone}
                      name="phone"
                      required
                      placeholder="Phone Number"
                      id="phone"
                      onChange={handleChanges}
                      className="p-2 border-2 border-black-400 outline-none w-full"
                    />
                  </div>
                  <div className="flex-col-start gap-2 w-full col-span-2">
                    {/* textare for more datails */}
                    <label htmlFor="message">Message</label>
                    <textarea
                      name="message"
                      value={userDetails.message}
                      onChange={handleChanges}
                      id="message"
                      placeholder="Leave a message"
                      className="w-full min-h-[100px] p-2 border-2 border-black-400 outline-none "
                    ></textarea>
                  </div>
                  <div className="flex gap-2  w-full col-span-2">
                    <Checkbox id="profile" />
                    <label
                      htmlFor="profile"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Update profile with this information
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
