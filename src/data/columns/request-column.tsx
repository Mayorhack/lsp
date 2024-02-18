"use client";

import { ColumnDef } from "@tanstack/react-table";

import { cn } from "@/lib/utils";

import { RequestDetails } from "@/types";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { formatDate } from "@/utils";
import Button from "@/components/Button";
import Link from "next/link";

export const columns: ColumnDef<RequestDetails>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Created" />
    ),
    cell: ({ row }) => (
      <div className="w-[120px]">{formatDate(row.original.createdAt)}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "vehicleType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vehicle" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("vehicleType")}</div>
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
    accessorKey: "officersCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Officers" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("officersCount")}</div>
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
  {
    accessorKey: "approvedBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Approved By" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("approvedBy") || "Nil"}</div>
    ),
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
          row.getValue("status") === "Rejected"
            ? "text-[#BF0202]"
            : row.getValue("status") === "Approved"
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
      return <Action row={row.original} />;
    },
  },
];
const Action = ({ row }: { row: RequestDetails }) => {
  return (
    <Link href={`/approvals/${row.requestId}`}>
      {" "}
      <Button variant={"outlined"} size={"sm"}>
        View
      </Button>
    </Link>
  );
};
