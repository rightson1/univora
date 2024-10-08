"use client";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CustomTable } from "@/components/shared/table";
import { AddSchool } from "@/components/super/schools/add-school";
import { useGetSchools } from "@/utils/hooks/useSchools";
import { school_columns } from "@/components/super/schools/school_columns";

export default function Schools() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const { data: schools } = useGetSchools();
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data: schools || [],
    columns: school_columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full p-4 md:p-8">
      <div className="flex items-center justify-between space-y-2 pb-5">
        <h2 className="text-3xl font-bold tracking-tight">Schools</h2>
        <div className="flex items-center space-x-2">
          <AddSchool />
        </div>
      </div>
      <CustomTable table={table} columns={school_columns} />
    </div>
  );
}
