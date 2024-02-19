"use client";
import { Metadata } from "next";
import { DataTable } from "@/components/seller/orders/data-table";
import { columns } from "@/components/seller/orders/columns";
import { Button } from "@/components/ui/button";
import { Create_Custom_Order } from "@/components/seller/orders/create_custom_order";
import Link from "next/link";
import { useGetOrders } from "@/utils/hooks/useOrder";
import { useSellerAuth } from "@/utils/sellerAuth";
import { useEffect, useState } from "react";
import { IOrderFetched } from "@/types";
import { FaPlus } from "react-icons/fa";

export default function TaskPage() {
  const { seller } = useSellerAuth();
  const { data, isPending } = useGetOrders(seller?._id);
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
          </div>
          <Button asChild>
            <Link href="/orders/create" className="flex gap-2">
              <FaPlus className="text-sm" />
              Order
            </Link>
          </Button>
        </div>
        <DataTable data={orders} columns={columns} loading={isPending} />
      </div>
    </>
  );
}
