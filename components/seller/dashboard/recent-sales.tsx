import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IOrderFetched } from "@/types";
import { useGetOrders } from "@/utils/hooks/useOrder";
import { useSellerAuth } from "@/utils/sellerAuth";
import { useEffect, useState } from "react";
export function RecentSales() {
  const { seller } = useSellerAuth();
  const { data, isPending } = useGetOrders(seller._id);
  const [orders, setOrder] = useState<IOrderFetched[]>([]);
  useEffect(() => {
    //data should only for this month , use created at
    if (data) {
      const orders_data = data.filter((order) => {
        const orderDate = new Date(order.createdAt);
        const currentDate = new Date();
        return orderDate.getMonth() === currentDate.getMonth();
      });
      setOrder(orders_data);
    }
  }, [data]);

  return (
    <div className="space-y-8 w-full ">
      {isPending ? (
        <div className="flex items-center gap-5">
          <Avatar className="mb:hidden h-9 w-9">
            <AvatarImage alt="Avatar" />
            <AvatarFallback>0</AvatarFallback>
          </Avatar>
          <div className="md:ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Loading</p>
            <p className="text-sm text-muted-foreground">Vercel, really...</p>
          </div>
          <div className="ml-auto font-medium">Loading</div>
        </div>
      ) : data ? (
        orders.map((order, i) => (
          <div className="flex items-center gap-5" key={i}>
            <Avatar className="mb:hidden h-9 w-9">
              <AvatarImage src={order.product.thumbnail} alt="Avatar" />
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <div className="md:ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {order.product.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {order.customerName}
              </p>
            </div>
            <div className="ml-auto font-medium">KSH {order.totalAmount}</div>
          </div>
        ))
      ) : (
        <div className="flex items-center gap-5">
          <Avatar className="mb:hidden h-9 w-9">
            <AvatarImage alt="Avatar" />
            <AvatarFallback>0</AvatarFallback>
          </Avatar>
          <div className="md:ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">No recent sales</p>
            <p className="text-sm text-muted-foreground">Dont feel bad</p>
          </div>
          <div className="ml-auto font-medium">KSH 0</div>
        </div>
      )}
    </div>
  );
}
