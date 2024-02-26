"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { useSellerAuth } from "@/utils/sellerAuth";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db2 } from "@/utils/firebase";
import { INotification, INotificationFetched } from "@/types";
import { formatDate } from "@/components/helpers/functions";
import { format } from "timeago.js";
import { vArr } from "@/app/api/utils/funcs";
export const Notifications = () => {
  const [notifications, setNotifications] = useState<INotificationFetched[]>(
    []
  );
  const { seller } = useSellerAuth();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const q = query(
      collection(db2, "notifications"),
      where("to", "==", seller._id)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedNotifications = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as INotificationFetched)
      );
      setNotifications(updatedNotifications);
    });
    return () => unsubscribe();
  }, [seller]);
  console.log(notifications);
  useEffect(() => {
    const update = async () => {
      if (notifications.length > 0) {
        const unseenNotifications = notifications.filter(
          (notification) => !notification.read
        );
        if (unseenNotifications.length > 0) {
          const unseenNotificationIds = unseenNotifications.map(
            (notification) => notification.id
          );
          // unseenNotificationIds.forEach(async (id) => {
          //   await updateDoc(doc(db2, "notifications", id), {
          //     read: true,
          //   });
          // });
          await Promise.all(
            unseenNotificationIds.map(async (id) => {
              await updateDoc(doc(db2, "notifications", id), {
                read: true,
              });
            })
          );
        }
      }
    };
    update();
  }, [notifications]);
  return (
    <Sheet open={open} onOpenChange={(open) => setOpen(open)}>
      <SheetTrigger>
        <div className="relative">
          <IoMdNotificationsOutline className="text-2xl" />
          {vArr(notifications) &&
            notifications.filter((n) => {
              return !n.read;
            }).length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {
                  notifications.filter((n) => {
                    return !n.read;
                  }).length
                }
              </span>
            )}
        </div>
      </SheetTrigger>
      <SheetContent className="w-[300px]" overlay={false}>
        <SheetHeader>
          <SheetTitle className="self-start">Activity?</SheetTitle>
        </SheetHeader>
        <div className="fx-c mt-5">
          {notifications.map((notification, i) => (
            <div className=" flex gap-4  w-full py-4 bc border-b" key={i}>
              <div className="fx-c gap-2 ">
                <div className="fb w-full ">
                  <h6 className="h6">
                    {notification.type === "order" ? "Order" : "Message"}
                  </h6>
                  <h6 className="h6">
                    {format(notification.createdAt)}
                    <div className="w-2 h-2 rounded-full bg-blue-500 inline-block ml-2"></div>
                  </h6>
                </div>
                <p className="text-sm font-[300]">{notification.message}</p>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
