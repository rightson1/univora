"use client";
import React, { useEffect } from "react";

import { toast } from "react-hot-toast";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { db } from "@/utils/firebase";
import { useUser } from "@/utils/userAuth";

import { IOrderFetched } from "@/types";
import { useGetOrders } from "@/utils/hooks/client/useOrder";
import { vArr } from "@/app/api/utils/funcs";
import { isProduct } from "@/utils/helpers";
import { View_Order } from "../../../../../components/client/orders/view_order";

const CheckoutForm = () => {
  const { user, fetchUser, logout } = useUser();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = useState("");
  const { data: orders, isLoading } = useGetOrders(user?._id);
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState<IOrderFetched>();

  useEffect(() => {
    if (user) {
      setName(user.displayName);
      setEmail(user.email);
      setPhone(user.phone || "");
    }
  }, [user]);
  const handleLogout = async () => {
    toast.promise(logout(), {
      loading: "Logging out...",
      success: "Logged out",
      error: "Error Logging out",
    });
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user) {
      const update = async () => {
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, {
          name: name,
          email: email,
          phone: phone,
        }).then(() => {
          fetchUser(user.uid);
        });
      };
      toast.promise(update(), {
        loading: "Updating...",
        success: "Updated",
        error: "Error Updating",
      });
    }
  };
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                className="w-full p-2 border-2 border-black-400"
              />
            </div>
            <div className="flex-col-start gap-2 w-full col-span-2 md:col-span-1">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                readOnly={!!email}
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                className="w-full p-2 border-2 border-black-400"
              />
            </div>
            <div className="flex-col-start gap-2 w-full  col-span-2">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="Phone Number"
                id="phone"
                className="p-2 border-2 border-black-400 w-full"
              />
            </div>
            <div className="w-full flex gap-5">
              <button
                className="w-full bg-indigo-500 text-white p-2 rounded-md"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
              <button
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
