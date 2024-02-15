"use client";
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
import { IoIosMore } from "react-icons/io";
import Image from "next/image";
import { EditThumbnail } from "@/components/seller/product/edit-thumbnail";
import { EditMedia } from "@/components/seller/product/edit-media";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useGetSingleOrder, useUpdateOrder } from "@/utils/hooks/useOrder";
import { IOrderFetched, TOrderStatus } from "@/types";
import { DashboardLoading } from "@/components/shared/dashboard_loading";
import Item_not_found from "@/components/shared/item_not_found";
import { fDate, useCustomToast } from "@/components/helpers/functions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const Order = ({
  params: { order: _id },
}: {
  params: {
    order: string;
  };
}) => {
  const { data: order, isPending } = useGetSingleOrder(_id);
  if (isPending) return <DashboardLoading />;
  if (order) {
    return (
      <div className="p-4">
        <div className="w-full flex items-start">
          <Link href="/orders" className="text-sm fc ">
            <FaArrowLeftLong className="mr-2" />
            <span>Back To Orders</span>
          </Link>
        </div>
        <div className="py-5 fx-c gap-5">
          <div className="flex gap-5 flex-col md:flex-row w-full">
            <div className="fx-c flex-[2] gap-5">
              <GeneralInfo order={order} />
              <Summary />
            </div>
            <div className="fx-c flex-1 gap-5">
              <Notes />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <Item_not_found
        link="/orders"
        btxt="Back To Orders"
        ptxt="This order does not exist or has been deleted."
      />
    );
  }
};
const GeneralInfo = ({ order }: { order: IOrderFetched }) => {
  const status = order.fulfillmentStatus;
  const { mutateAsync } = useUpdateOrder();
  const { loading, customToast } = useCustomToast();
  const handleUpdate = async (order_status: TOrderStatus) => {
    if (order_status === "completed") {
      const confirm = window.confirm(
        "Are you sure you want to complete this order?"
      );
      if (!confirm) return;
    }
    if (order_status === "cancelled") {
      const confirm = window.confirm(
        "Are you sure you want to cancel this order?"
      );
      if (!confirm) return;
    }
    customToast({
      func: async () =>
        mutateAsync({ fulfillmentStatus: order_status, _id: order._id }),
    });
  };
  return (
    <Card className="w-full h-auto ">
      <CardHeader className="mb:p-4">
        <div className="fb">
          <h4 className="h3 text-foreground">Ksh {order.totalAmount}</h4>
          <div className="fc">
            <Button variant="ghost" className="hidden md:flex">
              <GoDotFill className="mr-2 text-indigo capitalize" />
              {status}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost" size={"icon"}>
                  <IoIosMore />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {(status === "pending" || status === "confirmed") && (
                  <DropdownMenuItem onClick={() => handleUpdate("cancelled")}>
                    Cancel Order
                  </DropdownMenuItem>
                )}
                {status !== "completed" && (
                  <DropdownMenuItem onClick={() => handleUpdate("completed")}>
                    Complete Order
                  </DropdownMenuItem>
                )}
                {status === "pending" && (
                  <DropdownMenuItem onClick={() => handleUpdate("confirmed")}>
                    Confirm Order
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <CardDescription>{fDate(order.createdAt)}</CardDescription>
      </CardHeader>
      <CardContent className="fx-c gap-4 w-full h-auto ">
        <h4 className="h4">Details</h4>
        <div className="flex mb:gap-5 flex-wrap md:flex-row  items-center md:space-x-4 text-sm">
          <div className="flex gap-5">
            <div className="fx-c">
              <p>Email</p>
              <h5>
                <span className="text-foreground">
                  <a href="mailto:chari.rightson@gmail.com">
                    {order.customerName}
                  </a>
                </span>
              </h5>
            </div>
            <Separator
              orientation="vertical"
              className="hidden md:block h-10"
            />
          </div>
          <div className="flex gap-5">
            <div className="fx-c">
              <p>Phone</p>
              <h5>
                <span className="text-foreground">
                  <a href={`tel:${order.customerPhone}`}>
                    {order.customerPhone}
                  </a>
                </span>
              </h5>
            </div>
            <Separator
              orientation="vertical"
              className="hidden md:block h-10"
            />
          </div>

          <div>
            <p>Payment</p>
            <h5>
              <span className="text-foreground">{order.paymentMethod}</span>
            </h5>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
const Summary = () => {
  return (
    <Card className="w-full h-auto ">
      <CardHeader className="mb:p-4">
        <div className="fb">
          <h4 className="h3 text-foreground">Summary</h4>
          <div className="fc">
            <Button variant="ghost" className="hidden md:flex">
              <GoDotFill className="mr-2 text-indigo" />
              Paid
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="fx-c gap-5 w-full h-auto ">
        <div className="fb w-full">
          <div className="flex gap-5">
            <Image
              src="/imgs/3.png"
              width={200}
              height={200}
              alt="Image"
              className="w-16 object-cover  rounded-lg"
            />
            <div className="fx-c gap-2">
              <p className="p">Black Jeans</p>
              <Badge>Size 32, Black</Badge>
            </div>
          </div>
          <p>
            <span className="text-foreground">Ksh 500</span>
          </p>
        </div>

        <div className="flex gap-5 w-full fb">
          <div className="fx-c gap-2">
            <p className="p">Subtotal</p>
            <p className="p">Total</p>
          </div>
          <div className="fx-c gap-2">
            <p className="p">
              <span className="text-foreground">Ksh 500</span>
            </p>

            <p className="p">
              <span className="text-foreground">Ksh 600</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
const Notes = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="fb">
          <CardTitle>Timeline</CardTitle>
        </div>
        <CardDescription className="pt-5"></CardDescription>
      </CardHeader>
    </Card>
  );
};

export default Order;
