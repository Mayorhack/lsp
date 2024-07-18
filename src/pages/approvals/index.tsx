import React, { ChangeEvent, useState } from "react";
import { RequestFilters, TableFilters } from "@/types";
import { useQuery } from "@tanstack/react-query";
import SearchFilter from "@/components/data-table/search-filter";
import FormInput from "@/components/forms/FormInput";
import { DataTable } from "@/components/data-table";
import { columns } from "@/data/columns/request-column";
import axiosInstance from "@/utils/axios-instance";
import FormSelect from "@/components/forms/FormSelect";
import { approvalStatus } from "@/data";

const Approvals = () => {
  const [filters, setFilters] = useState<TableFilters>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [userFilters, setUserFilters] = useState<RequestFilters>({
    username: "",
    status: "",
  });
  const [appliedFilter, setAppliedFilter] = useState(false);

  const { data: userData, isLoading } = useQuery(
    ["allApprovals", filters, appliedFilter],
    () =>
      axiosInstance.request({
        method: "get",
        url: "/requests",
        params: {
          ...filters,
          ...userFilters,
        },
      })
  );
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
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
      status: "",
    });
    setAppliedFilter((prev) => !prev);
  };

  const userList = userData?.data.data;
  return (
    <div>
      <SearchFilter applyFilter={applyFilters} clearFilter={clearFilter}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>User Name</label>
            <FormInput
              name="username"
              value={userFilters.username}
              onChange={handleChange}
            />
          </div>
          <div className="">
            <label htmlFor="">Status</label>
            <FormSelect
              name="status"
              options={approvalStatus}
              onChange={handleChange}
              value={userFilters.status}
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

export default Approvals;
