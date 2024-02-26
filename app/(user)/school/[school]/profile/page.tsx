"use client";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useUser } from "@/utils/userAuth";
import { IOrderFetched } from "@/types";
import { useGetOrders } from "@/utils/hooks/client/useOrder";
import { vArr } from "@/app/api/utils/funcs";
import { isProduct } from "@/utils/helpers";
import { View_Order } from "../../../../../components/client/orders/view_order";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { useGetSchoolsOpen } from "@/utils/hooks/useSchools";
import { useEditUser } from "@/utils/hooks/client/useUser";
import { useCustomToast } from "@/components/helpers/functions";

const CheckoutForm = () => {
  const { user, logout, fetchUser } = useUser();
  const { data: orders, isLoading } = useGetOrders(user?._id);
  const { data: schools, isLoading: loading } = useGetSchoolsOpen();
  const { mutateAsync: edit_user } = useEditUser();
  const { customToast, loading: customLoading } = useCustomToast();
  const [userValues, setUserValues] = useState({
    name: user?.displayName,
    email: user?.email,
    phone: user?.phone,
    school: user?.school,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserValues({ ...userValues, [e.target.name]: e.target.value });
  };

  const handleLogout = async () => {
    toast.promise(logout(), {
      loading: "Logging out...",
      success: "Logged out",
      error: "Error Logging out",
    });
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      return;
    }
    const { name, email, phone, school } = userValues;
    customToast({
      func: async () => {
        await edit_user({
          _id: user?._id!,
          displayName: name!,
          phone: phone!,
          school: school!,
        });
      },
      sfunc: () => {
        fetchUser(user.email);
      },
    });
  };
  useEffect(() => {
    setUserValues({
      name: user?.displayName,
      email: user?.email,
      phone: user?.phone,
      school: user?.school,
    });
  }, [user]);
  return (
    <section className="mt-10 pad-x">
      <h2 className="h2-size  indigo">Account</h2>
      <div className="cols-2 gap-20 md:gap-10  mt-5 ">
        <form onSubmit={submit}>
          <div className="flex-col-start gap-5">
            <h2 className="p-size text-indigo-500">User Details</h2>
          </div>
          <div className="cols-2  w-full mt-5 ">
            <div className="flex-col-start gap-2 col-span-2 md:col-span-1">
              <label htmlFor="name">Name</label>
              <input
                placeholder={user?.displayName}
                type="text"
                name="name"
                value={userValues.name}
                onChange={handleChange}
                id="name"
                className="w-full p-2 border-2 border-black-400"
              />
            </div>
            <div className="flex-col-start gap-2 w-full col-span-2 md:col-span-1">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                readOnly={!!user?.email}
                name="email"
                value={userValues.email}
                onChange={handleChange}
                id="email"
                className="w-full p-2 border-2 border-black-400"
              />
            </div>
            <div className="flex-col-start gap-2 w-full  col-span-2">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                name="phone"
                value={userValues.phone}
                onChange={handleChange}
                required
                placeholder="Phone Number"
                id="phone"
                className="p-2 border-2 border-black-400 w-full"
              />
            </div>
            {vArr(schools) && (
              <div className="flex-col-start gap-2 w-full  col-span-2">
                <Select
                  required
                  name="school"
                  onValueChange={(value) =>
                    setUserValues({ ...userValues, school: value })
                  }
                  defaultValue={userValues.school}
                >
                  <SelectTrigger className=" w-full">
                    <SelectValue placeholder="Select School" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>
                        {loading ? "Loading..." : "School"}
                      </SelectLabel>
                      {vArr(schools) &&
                        schools.map((school) => (
                          <SelectItem key={school._id} value={school._id}>
                            {school.name}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="w-full flex gap-5">
              <button
                className="w-full bg-indigo-500 text-white p-2 rounded-md"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
              <button
                disabled={customLoading}
                className="w-full bg-indigo-500 text-white p-2 rounded-md"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
        <div className="flex-col-start gap-5 mt-10 md:mt-0">
          <h2 className="p-size text-indigo-500">Orders</h2>

          <div className="w-full overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100 items-start">
                  <th className="p-size p-2 text-start">Product</th>
                  <th className="p-size p-2 text-start">Quantity</th>
                  <th className="p-size p-2 text-start">Status</th>
                  <th className="p-size p-2 text-start">Total</th>

                  <th className="p-size p-2 text-start">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {isLoading ? (
                  <tr className="w-full p-4">
                    <td colSpan={5} className="p-4">
                      Loading...
                    </td>
                  </tr>
                ) : vArr(orders) ? (
                  orders.map((order) => (
                    <tr key={order._id} className="bg-white">
                      <td className="p-size p-2">{order.product.name}</td>
                      <td className="p-size p-2">
                        {isProduct(order.product) ? order.quantity : "N/A"}
                      </td>
                      <td className="p-size p-2">{order.fulfillmentStatus}</td>
                      <td className="p-size p-2">{order.totalAmount}</td>

                      <td className="p-size p-2">
                        <View_Order order={order} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="p-4">
                    <td>No Orders</td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* {order && (
              <OrderModal order={order} isOpen={isOpen} setIsOpen={setIsOpen} />
            )} */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutForm;
