import { Table } from "@tanstack/react-table";
import { TableFilters } from "@/types";
import FormSelect from "../forms/FormSelect";
import Button from "../Button";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  // eslint-disable-next-line no-unused-vars
  increasePageSize: (value: number) => void;
  goToNextPage(): void;
  goToPrevPage(): void;
  filters?: TableFilters;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  goToFirstPage(): void;
  goToLastPage(): void;
}

export function DataTablePagination<TData>({
  increasePageSize,
  goToNextPage,
  goToPrevPage,
  filters,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  goToFirstPage,
  goToLastPage,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center space-x-2  ">
        <p className="text-sm font-medium  ">Rows per page</p>
        <FormSelect
          options={[
            { name: "10", code: "10" },
            { name: "20", code: "20" },
            { name: "30", code: "30" },
            { name: "40", code: "40" },
            { name: "50", code: "50" },
          ]}
          onChange={(e) => {
            const value = e.target.value;
            increasePageSize(Number(value));
          }}
          className="p-1 w-24"
          value={filters?.pageSize?.toString()}
        />
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {filters?.pageIndex ? filters?.pageIndex + 1 : 1} of{" "}
          {totalPages || 1}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outlined"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={goToFirstPage}
            disabled={!hasPreviousPage}
          >
            <span className="sr-only">Go to first page</span>
            <FiChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outlined"
            className="h-8 w-8 p-0"
            onClick={goToPrevPage}
            disabled={!hasPreviousPage}
          >
            <span className="sr-only">Go to previous page</span>
            <FiChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outlined"
            className="h-8 w-8 p-0"
            onClick={goToNextPage}
            disabled={!hasNextPage}
          >
            <span className="sr-only">Go to next page</span>
            <FiChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outlined"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={goToLastPage}
            disabled={!hasNextPage}
          >
            <span className="sr-only">Go to last page</span>
            <FiChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
