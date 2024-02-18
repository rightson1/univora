"use client";

import * as React from "react";
import {
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
import { useAdminAuth } from "@/utils/AdminAuth";
import {
  useGetAdminSellers,
  useUpdateAdminSeller,
} from "@/utils/hooks/admin/useSellersAdmin";
import { ColumnDef } from "@tanstack/react-table";
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
import Link from "next/link";
import { MdPublishedWithChanges, MdUnpublished } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { TBusiness } from "@/types/sellerTypes";
import { ISellerFetched } from "@/types";
import { useCustomToast } from "@/components/helpers/functions";
import { useUpdateSeller } from "@/utils/hooks/useSeller";

export default function Businesses() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const { user } = useAdminAuth();
  const { data, isPending } = useGetAdminSellers(user.school as string);
  const [sellers, setSellers] = React.useState<ISellerFetched[]>([]);
  const { loading, customToast } = useCustomToast();
  const { mutateAsync } = useUpdateAdminSeller();
  React.useEffect(() => {
    if (data) {
      setSellers(data);
    }
  }, [data]);

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const changeStatus = async (seller: ISellerFetched) => {
    const newStatus = seller.status === "active" ? "suspended" : "active";
    //confirm
    if (
      !confirm(
        `Are you sure you want to ${newStatus} ${seller.name}'s business?`
      )
    ) {
      return;
    }

    customToast({
      func: async () => {
        await mutateAsync({
          _id: seller._id,
          status: newStatus,
        });
      },
    });
  };

  const seller_columns: ColumnDef<ISellerFetched>[] = [
    {
      accessorKey: "profileImage",
      header: "ProfileImage",
      cell: ({ row }) => (
        <div className="flex items-center">
          <Image
            src={row.getValue("profileImage")}
            alt=""
            height={50}
            width={50}
            className="w-8 h-8 object-cover rounded"
          />
          {/* <div className="ml-2">{row.getValue("name")}</div> */}
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div className="">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "visibility",
      header: "Visibility",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("visibility")}</div>
      ),
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("status")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const seller = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="flex items-center space-x-2"
                onClick={() => changeStatus(seller)}
              >
                {seller.status === "active" ? (
                  <>
                    <MdUnpublished />
                    <span>Suspend Business</span>
                  </>
                ) : (
                  <>
                    <MdPublishedWithChanges />
                    <span>Activate Business</span>
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center space-x-2" asChild>
                <Link href={`/products/${seller._id}`}>
                  <BiEdit />
                  <span>View Products</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data: sellers,
    columns: seller_columns,
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
        <h2 className="text-3xl font-bold tracking-tight">Businesses</h2>
      </div>
      <CustomTable table={table} columns={seller_columns} loading={isPending} />
    </div>
  );
}
