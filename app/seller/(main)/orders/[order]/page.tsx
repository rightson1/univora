"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
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
import {
  IOrderFetched,
  IProductFetched,
  IVariant,
  TOrderStatus,
} from "@/types";
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
import {
  Other_Payments,
  Payment_Status,
} from "@/components/seller/orders/payment";
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
            <div className="fx-c flex-[3] gap-5">
              <GeneralInfo order={order} />
              <Summary order={order} />
            </div>
            <div className="fx-c flex-[2] gap-5">
              <Payments order={order} />
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
              <p>Name</p>
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
const Summary = ({ order }: { order: IOrderFetched }) => {
  const status = order.paymentStatus;
  const product = order.product;
  return (
    <Card className="w-full h-auto ">
      <CardHeader className="mb:p-4">
        <div className="fb">
          <h4 className="h3 text-foreground">Summary</h4>
          <div className="fc">
            <Button variant="ghost" className="hidden md:flex">
              <GoDotFill className="mr-2 text-indigo" />
              {status}
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
              <p className="p">{product.name}</p>
              <Badge>
                {order.variant
                  ? `${order.variant?.options}-ksh. ${order.variant.price}`
                  : "No Variant"}
              </Badge>
            </div>
          </div>
          <p>
            <span className="text-foreground">Ksh {order.productPrice}</span>
          </p>
        </div>

        <div className="fx-c  gap-5 w-full">
          <div className="w-full">
            {order.otherPayments.length > 0 && (
              <div className="w-full">
                <h3 className="h3">Other Payments</h3>
                {order.otherPayments.map((payment, i) => (
                  <div className="fb w-full" key={i}>
                    <p className="p">{payment.name}</p>

                    <p className="p ">
                      <span className="text-foreground">
                        Ksh {payment.amount}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="fb w-full">
            <p className="p">Total</p>
            <p className="p">
              <span className="text-foreground">Ksh {order.totalAmount}</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
const Payments = ({ order }: { order: IOrderFetched }) => {
  const { customToast } = useCustomToast();
  const [otherPayments, setOtherPayments] = useState(order.otherPayments);

  const [totalAmount, setTotalAmount] = useState(order.totalAmount);
  const [paidAmount, setPaidAmount] = useState(order.paidAmount || 0);
  const { mutateAsync } = useUpdateOrder();
  useEffect(() => {
    let total = order.productPrice;

    if (order.variant?.price) {
      total = order.variant.price;
    }
    if (otherPayments.length > 0) {
      const total_other_payments = otherPayments.reduce(
        (acc, curr) => acc + curr.amount,
        0
      );
      total = total + total_other_payments;
    }
    setTotalAmount(total);
  }, [otherPayments]);
  const submit = async () => {
    customToast({
      func: async () => {
        await mutateAsync({
          _id: order._id,
          paymentStatus:
            paidAmount === totalAmount
              ? "paid"
              : paidAmount === 0
              ? "pending"
              : "partial",
          otherPayments: otherPayments,
          paidAmount: paidAmount,
          totalAmount: totalAmount,
          fulfillmentStatus:
            order.totalAmount !== totalAmount
              ? "confirmed"
              : order.fulfillmentStatus,
        });
      },
    });
  };
  return (
    <div className="fx-c gap-4 w-full">
      <Other_Payments
        otherPayments={otherPayments}
        setOtherPayments={setOtherPayments}
        submit={submit}
      />
      <Payment_Status
        totalAmount={totalAmount}
        setPaidAmount={setPaidAmount}
        paidAmount={paidAmount}
        submit={submit}
      />
    </div>
  );
};

export default Order;
