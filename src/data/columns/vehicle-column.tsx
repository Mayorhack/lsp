"use client";

import { ColumnDef } from "@tanstack/react-table";

import { cn } from "@/lib/utils";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { formatDate } from "@/utils";

import EditVehicle from "@/components/data-table/edit-vehicle";
import { VehicleType } from "@/types";

export const columns: ColumnDef<VehicleType>[] = [
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Created" />
    ),
    cell: ({ row }) => (
      <div className="w-[130px]">{formatDate(row.getValue("createdAt"))}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "vehicleName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vehicle Name" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("vehicleName")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "plateNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PlateNumber" />
    ),
    cell: ({ row }) => (
      <div className="w-[120px]">{row.getValue("plateNumber")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "color",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Color" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("color")}</div>,
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
      return <EditVehicle row={row.original} />;
    },
  },
];
