"use client";
import { IOrder, IProductFetched, IVariantFetched } from "@/types";
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
import { useCreateOrder } from "@/utils/hooks/client/useOrder";
import { isProduct, maxQuantity, totalPrice } from "@/utils/helpers";
import { useEditUser } from "@/utils/hooks/client/useUser";
import { useCustomToast } from "@/components/helpers/functions";
import { addDoc, collection } from "firebase/firestore";
import { db2 } from "@/utils/firebase";
export const Checkout_Form = ({
  product,
  variant,
}: {
  product: IProductFetched;
  variant?: IVariantFetched;
}) => {
  const { loading, customToast } = useCustomToast();
  const { handleSignIn, loggedIn, user, fetchUser } = useUser();
  const { mutateAsync: addOrder } = useCreateOrder();
  const { mutateAsync: editUser } = useEditUser();
  const [open, setOpen] = useState(false);
  const [updateProfile, setUpdateProfile] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    quantity: 1,
    totalPrice: totalPrice(product, variant),
  });

  useEffect(() => {
    if (user) {
      setOrderDetails({
        ...orderDetails,
        name: user.displayName || "",
        email: user.email || "",
        phone: user.phone || "",
        message: "",
      });
    }
  }, [user]);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!user) return toast.error("Please sign in to continue");
    if (isProduct(product) && orderDetails.quantity < 1) {
      return toast.error("Quantity cannot be less than 1");
    }

    e.preventDefault();
    const data: IOrder = {
      product: product._id,
      variant: variant,
      customerName: orderDetails.name,
      customerPhone: orderDetails.phone,
      message: orderDetails.message,
      orderType: "customer",
      paidAmount: 0,
      totalAmount: totalPrice(product, variant),
      quantity: orderDetails.quantity,
      seller: product.business,
      school: product.business.school,
      productPrice: product.price,
      otherPayments: [],
      customer: user._id,
    };
    const notificationData = {
      subject: "New Order",
      message: `You have a new order from ${user.displayName}`,
      type: "order",
      link: `/admin/orders`,
      from: user._id,
      to: product.business._id,
      read: false,
      createdAt: new Date().toISOString(),
    };

    customToast({
      func: async () => {
        await addOrder(data);
        await addDoc(collection(db2, "notifications"), notificationData);
        if (updateProfile) {
          await editUser({
            _id: user?._id,
            displayName: orderDetails.name,
            phone: orderDetails.phone,
          });
        }
      },
      sfunc: async () => {
        fetchUser(user.email!);
      },
    });
  };
  const handleChanges = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(e.target.value);
    setOrderDetails({
      ...orderDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="w-full"
          onClick={() => {
            if (hasVariants(product) && !variant) {
              return toast.error("Please select a variant");
            }
            if (user && loggedIn) {
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
        max-w-[90vw] sm:max-w-[900px]
        "
      >
        {user && (
          <form
            className=" mb:max-h-[80vh] 
    max-h-[90vh] rounded-md md:p-4 flex flex-col"
            onSubmit={submit}
          >
            <DialogHeader>
              <DialogTitle>Billing Information</DialogTitle>
              <DialogDescription>Enter your billing details</DialogDescription>
            </DialogHeader>
            <div className="overflow-y-auto flex-grow px-2 py-5 flex flex-col  items-start md:flex-row-reverse gap-20 md:gap-10  ">
              <div
                className="flex-col-start w-full
               gap-5 border-gray-300 p-4 border-[1px]
                md:mr-5  rounded-md"
              >
                {/* Item receipts/order */}
                <div className="flex-col-start gap-2 w-full">
                  <h2 className="p-size text-indigo-500 font-bold">
                    Order Summary
                  </h2>
                </div>
                <div className="fb w-full">
                  <h2 className="p-size text-indigo-500 font-semibold">
                    Product
                  </h2>
                  <h2 className="p-size text-indigo-500 font-semibold">
                    Total
                  </h2>
                </div>
                <hr className="h-[1px] bg-gray-300 w-full" />
                <div className="fb w-full">
                  <h2 className="p-size text-indigo-500">{product.name}</h2>
                  <h2 className="p-size text-indigo-500">{product.price}</h2>
                </div>
                {isProduct(product) && (
                  <div className="fb w-full">
                    <h2 className="p-size text-indigo-500">Quantity</h2>
                    <input
                      type="number"
                      name="quantity"
                      value={orderDetails.quantity}
                      min={1}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        const max = maxQuantity(product, variant);
                        if (value > max) {
                          return toast.error(`Max quantity is ${max}`);
                        }
                        if (value < 1 || isNaN(value)) {
                          return;
                        } else {
                          setOrderDetails({
                            ...orderDetails,
                            quantity: value,
                            totalPrice: totalPrice(product, variant) * value,
                          });
                        }
                      }}
                      className="w-[50px]  border-2 border-black-400 outline-none"
                    />
                  </div>
                )}
                <div className="fb w-full">
                  <h2 className="p-size text-indigo-500">Shipping</h2>
                  <h2 className="p-size text-indigo-500">Local Pickup</h2>
                </div>
                <div className="fb w-full">
                  <h2 className="p-size text-indigo-500">Total</h2>
                  <h2 className="p-size text-indigo-500">
                    {orderDetails.totalPrice}
                  </h2>
                </div>
                {/* cash on  delivery */}
                <div className="fb w-full">
                  <h2 className="p-size text-indigo-500 font-bold">
                    Payment Method
                  </h2>
                  <label className="" htmlFor="name">
                    Cash on Delivery
                  </label>
                </div>
              </div>
              <div className="w-full">
                <div>
                  <div className="cols-2  w-full ">
                    <div className="flex-col-start gap-2 col-span-2 md:col-span-1">
                      <label htmlFor="name">Name*</label>
                      <input
                        type="text"
                        value={orderDetails.name}
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
                        value={orderDetails.email}
                        id="email"
                        readOnly
                        className="w-full p-2 border-2 border-black-400 outline-none"
                        required
                        onChange={handleChanges}
                      />
                    </div>
                    <div className="flex-col-start gap-2 w-full  col-span-2">
                      <label htmlFor="phone">Phone*</label>
                      <input
                        type="tel"
                        value={orderDetails.phone}
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
                        value={orderDetails.message}
                        onChange={handleChanges}
                        id="message"
                        placeholder="Leave a message"
                        className="w-full min-h-[100px] p-2 border-2 border-black-400 outline-none "
                      ></textarea>
                    </div>
                    <div className="flex gap-2  w-full col-span-2">
                      <Checkbox
                        id="profile"
                        checked={updateProfile}
                        onCheckedChange={(e) => setUpdateProfile(e as boolean)}
                      />
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
            <DialogFooter className="py-2">
              <div className="flex flex-wrap gap-2 justify-end">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Close
                </Button>
                <Button type="submit" disabled={loading}>
                  Save changes
                </Button>
              </div>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
