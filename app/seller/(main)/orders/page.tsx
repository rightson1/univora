"use client";
import { Metadata } from "next";
import { DataTable } from "@/components/seller/orders/data-table";
import { columns } from "@/components/seller/orders/columns";
import { orders } from "@/utils/data";
import { Button } from "@/components/ui/button";
import { Create_Custom_Order } from "@/components/seller/orders/create_custom_order";
import Link from "next/link";
import { useGetOrders } from "@/utils/hooks/useOrder";
import { useSellerAuth } from "@/utils/sellerAuth";
import { useEffect, useState } from "react";
import { IOrderFetched } from "@/types";

export default function TaskPage() {
  const { seller } = useSellerAuth();
  const { data } = useGetOrders(seller?._id);
  const [orders, setOrders] = useState<IOrderFetched[]>([]);
  useEffect(() => {
    if (data) {
      setOrders(data);
    }
  }, [data]);

  return (
    <>
      <div className=" h-full flex-1 flex-col space-y-8  p-2 py-8 md:p-8 md:flex">
        <div className="flex items-center justify-between   space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
            <p className="text-muted-foreground">
              Scroll table right see more details
            </p>
          </div>
          <Button>
            <Link href="/orders/create">Create Order</Link>
          </Button>
        </div>
        <DataTable data={orders} columns={columns} />
      </div>
    </>
  );
}
