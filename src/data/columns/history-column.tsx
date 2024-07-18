"use client";

import { ColumnDef } from "@tanstack/react-table";
// import { cn } from "@/lib/utils";
import { RequestDetails } from "@/types";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { formatDate } from "@/utils";

export const columns: ColumnDef<RequestDetails>[] = [
  {
    accessorKey: "tripDuration",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date of Trip" />
    ),
    cell: ({ row }) => (
      <div className="w-[160px]">{formatDate(row.original.tripDuration)}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "purpose",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Purpose" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("purpose")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "destination",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Destination" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("destination")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "initiatedBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Initiator" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("initiatedBy")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  // {
  //   accessorKey: "status",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Status" />
  //   ),
  //   cell: ({ row }) => (
  //     <div
  //       className={cn(
  //         "w-[80px]",
  //         row.getValue("status") === "Rejected"
  //           ? "text-[#BF0202]"
  //           : row.getValue("status") === "Approved"
  //           ? "text-[#319402]"
  //           : "text-yellow-500"
  //       )}
  //     >
  //       {row.getValue("status")}
  //     </div>
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
];
