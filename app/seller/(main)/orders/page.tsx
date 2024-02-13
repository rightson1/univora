import { Metadata } from "next";
import { DataTable } from "@/components/seller/orders/data-table";
import { columns } from "@/components/seller/orders/columns";
import { orders } from "@/utils/data";
import { Button } from "@/components/ui/button";
import { Create_Custom_Order } from "@/components/seller/orders/create_custom_order";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Orders",
  description: "View All Your Orders.",
};

export default async function TaskPage() {
  return (
    <>
      <div className=" h-full flex-1 flex-col space-y-8  p-2 py-8 md:p-8 md:flex">
        <div className="flex items-center justify-between   space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
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
