import React, { ChangeEvent, FormEvent, useState } from "react";
import SearchFilter from "@/components/data-table/search-filter";
import { ResponseService, TableFilters, VehicleType } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios-instance";
import FormInput from "@/components/forms/FormInput";
import { DataTable } from "@/components/data-table";

import Button from "@/components/Button";
import Overlay from "@/components/Overlay";
import { AxiosResponse } from "axios";
import { columns } from "@/data/columns/vehicle-column";
import FormSelect from "@/components/forms/FormSelect";
import { status } from "@/data";
import { successAlert } from "@/utils/sweetAlert";
import Loader from "@/components/Loader";
interface VehicleFilters {
  plateNumber: string;
  status: string;
  color: string;
}
const Vehicles = () => {
  const queryClient = useQueryClient();
  const [addVehicleModal, setAddVehicleModal] = useState(false);
  const [filters, setFilters] = useState<TableFilters>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [vehicleFilters, setVehicleFilters] = useState<VehicleFilters>({
    plateNumber: "",
    status: "",
    color: "",
  });

  const [appliedFilter, setAppliedFilter] = useState(false);

  const { data: vehicleData, isLoading } = useQuery<
    AxiosResponse<ResponseService<VehicleType[]>>
  >(["allVehicles", filters, appliedFilter], () =>
    axiosInstance.request({
      method: "get",
      url: "/vehicles",
      params: {
        ...filters,
        ...vehicleFilters,
      },
    })
  );
  const vehicleList = vehicleData?.data.data || [];
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setVehicleFilters((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const [addVehicleForm, setAddVehicleForm] = useState({
    vehicleName: "",
    color: "",
    status: "Active",
    plateNumber: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddVehicleForm((prev) => {
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
    setVehicleFilters({
      plateNumber: "",
      status: "",
      color: "",
    });
    setAppliedFilter(false);
  };
  const addVehicle = useMutation(
    () =>
      axiosInstance.request({
        method: "POST",
        url: "/vehicles",
        data: addVehicleForm,
      }),
    {
      onSuccess: () => {
        successAlert("Vehicle Added Successfully");
        setAddVehicleModal(false);
        queryClient.invalidateQueries(["allVehicles"]);
      },
    }
  );
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addVehicle.mutate();
  };
  return (
    <div>
      <div className="grid grid-cols-[4fr,1fr] gap-2 items-center">
        <SearchFilter applyFilter={applyFilters} clearFilter={clearFilter}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Plate Number</label>
              <FormInput
                name="plateNumber"
                value={vehicleFilters.plateNumber}
                onChange={handleFilterChange}
              />
            </div>
            <div>
              <label>Color</label>
              <FormInput
                name="color"
                value={vehicleFilters.color}
                onChange={handleFilterChange}
              />
            </div>{" "}
            <div>
              <label>Status</label>
              <FormSelect
                options={status}
                onChange={handleFilterChange}
                name="Status"
              />
            </div>
          </div>
        </SearchFilter>
        <Button onClick={() => setAddVehicleModal(true)} className="h-10">
          Add Vehicle
        </Button>
      </div>
      <div className="">
        <DataTable
          columns={columns}
          dataList={vehicleList}
          filters={filters}
          setFilters={setFilters}
          hasNextPage={vehicleData?.data.hasNextPage}
          hasPreviousPage={vehicleData?.data.hasPrevPage}
          totalPages={vehicleData?.data.totalPages}
          isLoading={isLoading}
        />
      </div>
      <Overlay
        openState={addVehicleModal}
        closeModal={() => setAddVehicleModal(false)}
      >
        <h3 className="text-2xl mb-4 font-semibold">
          Enter Vehicle Details Here
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-240 gap-2">
            {" "}
            <div>
              <label>Vehicle Name</label>
              <FormInput
                name="vehicleName"
                value={addVehicleForm.vehicleName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Plate Number</label>
              <FormInput
                name="plateNumber"
                value={addVehicleForm.plateNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Color</label>
              <FormInput
                name="color"
                value={addVehicleForm.color}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Status</label>
              <FormSelect
                options={status}
                onChange={handleChange}
                required
                name="status"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 mt-8 w-full gap-2">
            <Button
              type="reset"
              variant={"dark"}
              onClick={() => {
                setAddVehicleModal(false);
                setAddVehicleForm({
                  color: "",
                  plateNumber: "",
                  status: "",
                  vehicleName: "",
                });
              }}
              className="w-full block"
            >
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Overlay>
      {addVehicle.isLoading ? <Loader /> : null}
    </div>
  );
};

export default Vehicles;
