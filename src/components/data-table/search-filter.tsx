import { FC, HTMLAttributes } from "react";

import { FiSliders } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import FormInput from "../forms/FormInput";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import Button from "../Button";

interface SearchFilterProps extends HTMLAttributes<HTMLDivElement> {
  applyFilter(): void;
  clearFilter(): void;
}
const SearchFilter: FC<SearchFilterProps> = ({
  children,
  applyFilter,
  clearFilter,
  ...props
}) => {
  return (
    <div className="flex justify-between items-center space-x-2">
      <div className="relative">
        <FormInput
          placeholder="Search"
          className="bg-white pl-10 p-3 rounded-sm w-[150px] lg:w-[250px]"
        />
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-500" />
        </span>
      </div>

      <Popover>
        <PopoverTrigger>
          <Button variant="outlined" size="sm" className="max-w-xs">
            <FiSliders className="h-3 w-3 mr-2 transform rotate-90 text-highlight" />
            Filter Table
          </Button>
        </PopoverTrigger>
        <PopoverContent className="" {...props}>
          <div className="w-60 sm:w-96   bg-white p-2">
            {children}
            <div className="flex justify-between items-center gap-4 mt-6">
              <Button variant={"dark"} size={"sm"} onClick={clearFilter}>
                Clear Filter
              </Button>
              <Button size={"sm"} onClick={applyFilter}>
                Apply Filter
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SearchFilter;
