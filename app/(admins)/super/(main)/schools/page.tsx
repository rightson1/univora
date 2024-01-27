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
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

import { productsTable as data, universitiesTable } from "@/utils/data";
import Link from "next/link";
import { MdDeleteOutline, MdUnpublished } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { CustomTable } from "@/components/shared/table";
import { ISchoolFetched } from "@/types";
import { AddSchool } from "@/components/super/schools/add-school";
import { EditSchool } from "@/components/super/schools/edit-school";
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
