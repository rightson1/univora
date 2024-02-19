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
import { useSellerAuth } from "@/utils/sellerAuth";
import {
  useDeleteProduct,
  useGetProducts,
  useUpdateProduct,
} from "@/utils/hooks/useProduct";
import { IProductFetched } from "@/types";
import { deleteFile, useCustomToast } from "@/components/helpers/functions";

export default function Products() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const { seller } = useSellerAuth();
  const { data: products, isLoading } = useGetProducts(seller._id);

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const { mutateAsync: editProduct } = useUpdateProduct();
  const { customToast, loading } = useCustomToast();
  const { mutateAsync: deleteProduct } = useDeleteProduct();
  const handleProductState = async (id: string, active: boolean) => {
    customToast({
      func: async () => {
        await editProduct({
          _id: id,
          active,
        });
      },
      suc: `Product ${active ? "published" : "unpublished"} successfully`,
    });
  };
  const handleDeleteProduct = async (product: IProductFetched) => {
    customToast({
      func: async () => {
        product.thumbnail && (await deleteFile(product.thumbnail));
        if (product.media.length > 0) {
          await Promise.all(
            product.media.map(async (media) => {
              await deleteFile(media);
            })
          );
        }
        await deleteProduct(product._id);
      },
      suc: `Bye bye ${product.name}!`,
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
      accessorKey: "active",
      header: "Published",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue("active") === true ? "True" : "False"}
        </div>
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
                className="flex  items-center space-x-2"
                asChild
              >
                <Link href={`/products/${product._id}`}>
                  <BiEdit />
                  <span>Edit</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={loading}
                className="flex items-center space-x-2 cursor-pointer"
                onClick={
                  product.active
                    ? () => handleProductState(product._id, false)
                    : () => handleProductState(product._id, true)
                }
              >
                {product.active ? (
                  <MdUnpublished />
                ) : (
                  <MdPublishedWithChanges />
                )}
                <span>{product.active ? "Unpublish" : "Publish"}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex items-center space-x-2 cursor-pointer "
                disabled={loading}
                onClick={() => handleDeleteProduct(product)}
              >
                <MdDeleteOutline />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: products || [],
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

  return (
    <div className="w-full p-4 md:p-8">
      <div className="flex items-center justify-between space-y-2 pb-5">
        <h2 className="text-2xl font-bold tracking-tight">
          Products | Services
        </h2>
        <div className="flex items-center space-x-2">
          <Link href="/new-product">
            <Button size={"sm"}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </Link>
        </div>
      </div>
      <CustomTable table={table} columns={columns} loading={isLoading} />
    </div>
  );
}
