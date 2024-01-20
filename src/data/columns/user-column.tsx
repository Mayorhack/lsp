"use client";

import { ColumnDef } from "@tanstack/react-table";

import { cn } from "@/lib/utils";

import { UserDetails } from "@/types";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { formatDate } from "@/utils";

export const columns: ColumnDef<UserDetails>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Created" />
    ),
    cell: ({ row }) => (
      <div className="w-[130px]">{formatDate(row.original.createdAt)}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User Name" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("username")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "firstname",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First Name" />
    ),
    cell: ({ row }) => (
      <div className="w-[120px]">{row.getValue("firstname")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "lastname",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("lastname")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <div className="w-[140px]">{row.getValue("email")}</div>,
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <div
        className={cn(
          "w-[80px]",
          row.getValue("status") === "Inactive"
            ? "text-[#BF0202]"
            : row.getValue("status") === "Active"
            ? "text-[#319402]"
            : "text-yellow-500"
        )}
      >
        {row.getValue("status")}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions(s)" />
    ),
    cell: ({ row }) => {
      return <p>{row.original.active}</p>;
    },
  },
];
