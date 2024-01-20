import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

import { DataTablePagination } from "./data-table-pagination";
import { TableFilters } from "@/types";
import NoDataComponent from "./NoDataComponent";
import ScreenLoader from "../ScreenLoader";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  dataList: TData[];
  filters: TableFilters;
  setFilters: React.Dispatch<React.SetStateAction<TableFilters>>;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isLoading?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  dataList,
  filters,
  setFilters,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const data = React.useMemo(() => {
    return Array.isArray(dataList) ? dataList : [];
  }, [dataList]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });
  const increasePageSize = (size: number) => {
    setFilters((prev: TableFilters) => {
      return {
        ...prev,
        pageSize: size,
      };
    });
  };
  const goToNextPage = React.useCallback(() => {
    setFilters((prev: TableFilters) => {
      const newValue = prev.pageIndex + 1;
      return {
        ...prev,
        pageIndex: newValue,
      };
    });
  }, [setFilters]);
  const goToPrevPage = () => {
    setFilters((prev: TableFilters) => {
      return {
        ...prev,
        pageIndex: prev.pageIndex - 1,
      };
    });
  };
  const goToFirstPage = () => {
    setFilters((prev: TableFilters) => {
      return {
        ...prev,
        pageIndex: 0,
      };
    });
  };
  const goToLastPage = () => {
    setFilters((prev: TableFilters) => {
      return {
        ...prev,
        pageIndex: totalPages ? totalPages - 1 : 1,
      };
    });
  };
  if (isLoading) {
    return <ScreenLoader />;
  }
  if (!dataList?.length) {
    return <NoDataComponent />;
  }

  return (
    <div className="space-y-4 mt-10">
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-[#021B3D] rounded-3xl">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-white">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="mb-4 text-sm text-text-72">
            {table?.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className=" bg-white py-4 mt-10 "
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination
        table={table}
        goToNextPage={goToNextPage}
        goToPrevPage={goToPrevPage}
        increasePageSize={increasePageSize}
        filters={filters}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        totalPages={totalPages}
        goToFirstPage={goToFirstPage}
        goToLastPage={goToLastPage}
      />
    </div>
  );
}
