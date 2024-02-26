"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  Edit,
  MoreHorizontal,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import Image from "next/image";
import Link from "next/link";
import {
  MdDeleteOutline,
  MdPublishedWithChanges,
  MdUnpublished,
} from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { CustomTable } from "@/components/shared/table";
import {
  useDeleteProduct,
  useGetProducts,
  useUpdateProduct,
} from "@/utils/hooks/useProduct";
import { IProductFetched } from "@/types";
import { deleteFile, useCustomToast } from "@/components/helpers/functions";
import { useGetSellerAdmin } from "@/utils/hooks/admin/useSellersAdmin";
import { useGetProductsAdmin } from "@/utils/hooks/admin/useProductsAdmin";
import { DashboardLoading } from "@/components/shared/dashboard_loading";
import Item_not_found from "@/components/shared/item_not_found";

export default function Products({
  params: { business },
}: {
  params: { business: string };
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const { data: seller, isPending: sellerPending } =
    useGetSellerAdmin(business);
  const { data: products_raw, isPending: productsLoading } =
    useGetProductsAdmin(business);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const { mutateAsync: editProduct } = useUpdateProduct();
  const { customToast, loading } = useCustomToast();
  const [products, setProducts] = React.useState<IProductFetched[]>([]);
  React.useEffect(() => {
    if (products_raw) {
      setProducts(products_raw);
    }
  }, [products_raw]);
  const { mutateAsync: deleteProduct } = useDeleteProduct();
  const handleProductState = async (
    id: string,
    status: IProductFetched["status"]
  ) => {
    customToast({
      func: async () => {
        await editProduct({
          _id: id,
          status,
        });
      },
      suc: `Product ${status}`,
    });
  };

  const columns: ColumnDef<IProductFetched>[] = [
    {
      accessorKey: "thumbnail",
      header: "Thumbnail",
      cell: ({ row }) => (
        <div className="flex items-center">
          <Image
            src={row.getValue("thumbnail")}
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
      accessorKey: "productType",
      header: "Type",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("productType")}</div>
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
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("stock")}</div>
      ),
    },
    // {
    //   accessorKey: "category",
    //   header: "Category",
    //   cell: ({ row }) => (
    //     <div className="capitalize">
    //       {(row.getValue("category") as { name: string }).name}
    //     </div>
    //   ),
    // },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original;

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
                disabled={loading}
                className="flex items-center space-x-2 cursor-pointer"
                onClick={
                  product.status === "published"
                    ? () => handleProductState(product._id, "suspended")
                    : () => handleProductState(product._id, "published")
                }
              >
                {product.status === "published" ? (
                  <div className="fc gap-2">
                    <MdUnpublished />
                    <span>Suspend</span>
                  </div>
                ) : (
                  <div className="fc gap-2">
                    <MdPublishedWithChanges />
                    <span>publish</span>
                  </div>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: products,
    columns,

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

  if (productsLoading || sellerPending) {
    return <DashboardLoading />;
  }
  if (seller && products_raw) {
    return (
      <div className="w-full p-4 md:p-8">
        <div className="flex items-center justify-between space-y-2 pb-5">
          <h2 className="text-2xl font-bold tracking-tight">
            {seller.name} Products
          </h2>
        </div>
        <CustomTable
          table={table}
          columns={columns}
          loading={productsLoading}
        />
      </div>
    );
  } else {
    return (
      <Item_not_found
        btxt="No products found"
        link="/"
        ptxt="Go back to home page"
      />
    );
  }
}
