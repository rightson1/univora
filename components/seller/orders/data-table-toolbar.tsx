"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/seller/orders/data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { orderStatus, paymentStatus } from "@/utils/data";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between  ">
      <div className="mb:flex-col mb:items-start  gap-2 flex flex-1 items-center space-x-2">
        <Input
          placeholder="Customer Name..."
          value={
            (table.getColumn("customerName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("customerName")?.setFilterValue(event.target.value)
          }
          className="h-8 mb:w-full w-[150px] lg:w-[250px]"
        />
        <div className="flex gap-2 w-full mb:flex-col overflow-hidden">
          <div className="mb:w-3/4 flex gap-4">
            {" "}
            {table.getColumn("fulfillmentStatus") && (
              <DataTableFacetedFilter
                column={table.getColumn("fulfillmentStatus")}
                title="Status"
                options={orderStatus}
              />
            )}
            {table.getColumn("paymentStatus") && (
              <DataTableFacetedFilter
                column={table.getColumn("paymentStatus")}
                title="Payment"
                options={paymentStatus}
              />
            )}
          </div>

          <div className="mb:w-3/4">
            {isFiltered && (
              <Button
                variant="ghost"
                onClick={() => table.resetColumnFilters()}
                className="h-8 px-2 lg:px-3"
              >
                Reset
                <Cross2Icon className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
