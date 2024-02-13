"use client";
import * as React from "react";
import { ColumnDef, Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MdPublish } from "react-icons/md";
import { MdOutlineUnpublished } from "react-icons/md";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdDeleteOutline, MdUnpublished } from "react-icons/md";
import { ISchoolFetched, IAdminFetched } from "@/types";
import { EditSchool } from "@/components/super/schools/edit-school";
import { useEditAdmin } from "@/utils/hooks/useAdmin";
import { useCustomToast } from "@/components/helpers/functions";
const EditStatus = ({ row }: { row: Row<IAdminFetched> }) => {
  const { mutateAsync } = useEditAdmin();
  const { loading, customToast } = useCustomToast();
  const school = row.original;
  return (
    <DropdownMenuItem
      onClick={async () => {
        customToast({
          func: async () => {
            await mutateAsync({
              _id: school._id,
              status: school.status === "active" ? "suspended" : "active",
            });
          },
        });
      }}
      className="flex items-center space-x-2"
    >
      {school.status === "active" ? (
        <MdUnpublished className="h-5 w-5" />
      ) : (
        <MdPublish className="h-5 w-5" />
      )}
      {school.status === "active" ? "Suspend" : "Activate"}
    </DropdownMenuItem>
  );
};
export const admin_columns: ColumnDef<IAdminFetched>[] = [
  {
    accessorKey: "displayName",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("displayName")}</div>,
  },

  {
    accessorKey: "school",
    header: "School",
    cell: ({ row }) => (
      <div className="capitalize">{row.original.school.name}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.original.status === "active" ? (
          <span className="text-green-500">Active</span>
        ) : (
          <span className="text-red-500">Suspended</span>
        )}
      </div>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const school = row.original;

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
            <EditStatus row={row} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
