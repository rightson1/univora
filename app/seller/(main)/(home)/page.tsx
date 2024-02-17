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
import Cards from "@/components/seller/dashboard/cards";
export default function DashboardPage() {
  return (
    <>
      <div className=" flex-col md:flex">
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            {/* <div className="flex items-center space-x-2">
              <Button>Download</Button>
            </div> */}
          </div>
          <Cards />
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="mb:col-span-4 col-span-3">
              <CardHeader>
                <CardTitle>Recent sales</CardTitle>
                <CardDescription>
                  Lets see how your sales are doing
                </CardDescription>
              </CardHeader>
              <CardContent>
                {" "}
                <RecentSales />{" "}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
