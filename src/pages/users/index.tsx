import { DataTable } from "@/components/data-table";
import SearchFilter from "@/components/data-table/search-filter";
import FormInput from "@/components/forms/FormInput";
import { columns } from "@/data/columns/user-column";
import { TableFilters, UserFilters } from "@/types";
import axiosInstance from "@/utils/axios-instance";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const Users = () => {
  const [filters, setFilters] = useState<TableFilters>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [userFilters, setUserFilters] = useState<UserFilters>({
    username: "",
  });
  const [appliedFilter, setAppliedFilter] = useState(false);

  const { data: userData, isLoading } = useQuery(
    ["allUsers", filters, appliedFilter],
    () =>
      axiosInstance.request({
        method: "get",
        url: "/users",
        params: {
          ...filters,
          ...userFilters,
        },
      })
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserFilters((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const applyFilters = () => {
    setAppliedFilter((prev) => !prev);
  };
  const clearFilter = () => {
    setUserFilters({
      username: "",
    });
    setAppliedFilter(false);
  };

  const userList = userData?.data.data;
  return (
    <div>
      <SearchFilter applyFilter={applyFilters} clearFilter={clearFilter}>
        <div className="grid grid-cols-240 gap-4">
          <div>
            <label>User Name</label>
            <FormInput
              name="username"
              value={userFilters.username}
              onChange={handleChange}
            />
          </div>
        </div>
      </SearchFilter>

      <div className="">
        <DataTable
          columns={columns}
          dataList={userList}
          filters={filters}
          setFilters={setFilters}
          hasNextPage={userData?.data.hasNextPage}
          hasPreviousPage={userData?.data.hasPreviousPage}
          totalPages={userData?.data.totalPages}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Users;
