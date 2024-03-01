"use client";
import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Overview } from "@/components/seller/dashboard/overview";
import { RecentSales } from "@/components/seller/dashboard/recent-sales";
import { useSellerAuth } from "@/utils/sellerAuth";
import { useGetOrders } from "@/utils/hooks/useOrder";
import { useEffect, useMemo, useState } from "react";
import { IOrderFetched } from "@/types";
import { FiDollarSign } from "react-icons/fi";
import { IoBagCheckOutline } from "react-icons/io5";
import { MdOutlineDownloading } from "react-icons/md";
import { useGetProducts } from "@/utils/hooks/useProduct";
import { CiShoppingCart } from "react-icons/ci";
const Cards = () => {
  const { seller } = useSellerAuth();
  const { data } = useGetOrders(seller._id);
  const [orders, setOrders] = useState<IOrderFetched[]>([]);
  const { data: products } = useGetProducts(seller._id);
  useEffect(() => {
    if (data) {
      const orders_data = data.filter((order) => {
        const orderDate = new Date(order.createdAt);

        const currentDate = new Date();
        return orderDate.getMonth() === currentDate.getMonth();
      });
      setOrders(orders_data);
    }
  }, [data]);
  const { completed_orders, pending_orders, totalRevenueTotal } =
    useMemo(() => {
      const totalRevenueTotal = orders
        .filter((order) => {
          //completed orders
          return order.fulfillmentStatus === "completed";
        })

        .reduce((acc, order) => acc + order.totalAmount, 0);
      const completed_orders = orders.filter((order) => {
        return order.fulfillmentStatus === "completed";
      });
      const pending_orders = orders.filter((order) => {
        return order.fulfillmentStatus === "pending";
      });
      return {
        completed_orders,
        pending_orders,
        totalRevenueTotal,
      };
    }, [orders]);
  const { active_products, all_products } = useMemo(() => {
    const active_products =
      products?.filter((product) => product.active === true) || [];
    return {
      active_products,
      all_products: products || [],
    };
  }, [products]);
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader
          className="flex
               flex-row items-center justify-between space-y-0 pb-2"
        >
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <FiDollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            <span className="text-xs text-muted-foreground">KSH</span>
            {totalRevenueTotal}
          </div>
          <p className="text-xs text-muted-foreground">
            {totalRevenueTotal > 0
              ? "You are doing great!"
              : `Dont worry, you will get there soon!`}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Completed Orders
          </CardTitle>
          <IoBagCheckOutline className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {completed_orders.length}{" "}
            <span className="text-xs text-muted-foreground">
              / {orders.length}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {completed_orders.length > 0
              ? `You have ${completed_orders.length} completed orders`
              : "No completed orders yet!"}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
          <MdOutlineDownloading className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {pending_orders.length}{" "}
            <span className="text-xs text-muted-foreground">
              / {orders.length}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {pending_orders.length > 0
              ? `You have ${pending_orders.length} pending orders`
              : "You are doing great! 0 pending orders"}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Products</CardTitle>
          <CiShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {active_products?.length}{" "}
            <span className="text-xs text-muted-foreground">
              / {all_products.length}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {!products
              ? "Loading products..."
              : active_products.length > 0
              ? `You have ${active_products?.length} published products`
              : "You have no products"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cards;
