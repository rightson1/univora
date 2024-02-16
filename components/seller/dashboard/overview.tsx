"use client";

import { useGetOrders } from "@/utils/hooks/useOrder";
import { useSellerAuth } from "@/utils/sellerAuth";
import { useMemo, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { format } from "date-fns";

export function Overview() {
  const { seller } = useSellerAuth();
  const { data } = useGetOrders(seller._id);
  //avarate for each day for the past  7 days
  const order_data = useMemo(() => {
    // Get the last 7 days
    if (!data) return [];
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return format(d, "EEEE");
    }).reverse();

    // Calculate the average orders for each day
    return days.map((day) => {
      const ordersThatDay = data.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return format(orderDate, "EEEE") === day;
      });

      return {
        name: day.slice(0, 3),
        total: ordersThatDay.reduce((acc, order) => acc + order.totalAmount, 0),
      };
    });
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={order_data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `ksh ${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
