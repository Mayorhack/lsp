import axiosInstance from "@/utils/axios-instance";
import { successAlert } from "@/utils/sweetAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Overlay from "../Overlay";
import FormInput from "../forms/FormInput";
import FormSelect from "../forms/FormSelect";
import Button from "../Button";
import Loader from "../Loader";
import { status } from "@/data";
import { VehicleType } from "@/types";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Link from "next/link";

const EditVehicle = ({ row }: { row: VehicleType }) => {
  const queryClient = useQueryClient();
  const [addVehicleForm, setAddVehicleForm] = useState({
    ...row,
  });
  const [addVehicleModal, setAddVehicleModal] = useState(false);
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
  const addVehicle = useMutation(
    () =>
      axiosInstance.request({
        method: "POST",
        url: "/vehicles",
        data: addVehicleForm,
      }),
    {
      onSuccess: () => {
        successAlert("Vehicle updated Successfully");
        setAddVehicleModal(false);
        queryClient.invalidateQueries(["allVehicles"]);
      },
    }
  );
  const [open, setOpen] = useState(false);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addVehicle.mutate();
  };
  return (
    <div>
      {/* <Button
        variant={"outlined"}
        size={"sm"}
        onClick={() => setAddVehicleModal(true)}
      >
        Open
      </Button> */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <HiOutlineDotsVertical size={20} />
        </PopoverTrigger>
        <PopoverContent className="">
          <div className="w-24 text-sm font-medium -mt-2 bg-white text-gray-500">
            <p
              onClick={() => setAddVehicleModal(true)}
              className="hover:bg-gray-200 -mx-2 px-2 py-1 cursor-pointer"
            >
              Edit
            </p>

            <Link
              href={`/vehicles/${row._id}`}
              className="hover:bg-gray-200 -mx-2 px-2 py-1 cursor-pointer block"
            >
              View History
            </Link>
          </div>
        </PopoverContent>
      </Popover>
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
                value={addVehicleForm.status}
                required
                defaultValue={"Active"}
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
                  vehicleId: 0,
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

export default EditVehicle;
