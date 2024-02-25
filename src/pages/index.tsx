import React, { useState } from "react";
import Logo from "../images/logo.svg";
import FormSelect from "@/components/forms/FormSelect";
import FormInput from "@/components/forms/FormInput";
import Image from "next/image";
import Button from "@/components/Button";
import {
  ResponseService,
  SelectOptionProp,
  VehicleRequestType,
  VehicleType,
} from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios-instance";
import ScreenLoader from "@/components/ScreenLoader";
import { notifySuccess } from "@/utils/notifier";
import { AxiosResponse } from "axios";
import MyDatePicker from "@/components/forms/MyDatePicker";

const Home = () => {
  const queryClient = useQueryClient();
  const { data: vehicleData } = useQuery<
    AxiosResponse<ResponseService<VehicleType[]>>
  >(["allVehicles"], () =>
    axiosInstance.request({
      method: "get",
      url: "/vehicles/lookup",
      params: {
        pageIndex: 0,
        pageSize: 1000,
      },
    })
  );
  const vehicleList: SelectOptionProp[] = vehicleData?.data.data
    ? vehicleData.data.data.map((item) => {
        return {
          name: item.vehicleName,
          code: item.vehicleId.toString(),
        };
      })
    : [];
  const vehicle = vehicleData?.data.data ? vehicleData.data.data : [];

  const [requestForm, setRequestForm] = useState<VehicleRequestType>({
    emailAddress: "",
    vehicleType: "",
    destination: "",
    purpose: "",
    officersCount: "",
    tripDuration: null,
    initiatedBy: "",
    status: "",
  });
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setRequestForm((prev) => {
      if (name === "vehicleName") {
        return { ...prev, vehicleId: Number(value) };
      }
      return { ...prev, [name]: value };
    });
  };
  const makeRequest = useMutation(
    () =>
      axiosInstance.request({
        url: "/requests",
        method: "POST",
        data: {
          ...requestForm,
          vehicle: vehicle.find(
            (item) => item.vehicleId === Number(requestForm.vehicleType)
          ),
        },
      }),
    {
      onSuccess: () => {
        notifySuccess("SuccessFul");
        queryClient.invalidateQueries(["allVehicles"]);
        setRequestForm({
          emailAddress: "",
          vehicleType: "",
          destination: "",
          purpose: "",
          officersCount: "",
          tripDuration: null,
          initiatedBy: "",
          status: "",
          vehicle: undefined,
        });
      },
    }
  );
  return (
    <div className="container mx-auto">
      <div className=" flex justify-center items-center flex-col">
        <span className="flex justify-center items-centercursor-pointer my-6 w-full">
          <Image src={Logo} alt="Logo" />
        </span>
        <div className=" flex justify-center items-center flex-col py-8 text-[#101828]">
          <h1 className="font-semibold text-2xl  md:text-5xl  ">
            Vehicle Request Form
          </h1>
          <p className="text-center mt-4">
            Please fill the form with accurate information.
          </p>
        </div>
        <form
          className="grid mx-auto gap-10 mt-2 px-6 w-full max-w-2xl"
          onSubmit={(e) => {
            e.preventDefault();
            makeRequest.mutate();
          }}
        >
          <FormInput
            label=""
            placeholder="Email Address"
            onChange={handleChange}
            value={requestForm.emailAddress}
            name="emailAddress"
            required
          />
          <FormSelect
            options={vehicleList}
            placeholder="Select Vehicle Type"
            onChange={handleChange}
            value={requestForm.vehicleType}
            name="vehicleType"
            required
          />
          <FormInput
            label=""
            placeholder="Destination"
            onChange={handleChange}
            value={requestForm.destination}
            name="destination"
            required
          />
          <FormInput
            label=""
            placeholder="Purpose of use "
            onChange={handleChange}
            value={requestForm.purpose}
            name="purpose"
            required
          />
          <FormInput
            label=""
            type="number"
            placeholder="Number of Officers to go on field trip"
            onChange={handleChange}
            value={requestForm.officersCount}
            name="officersCount"
            required
          />
          <div className="flex gap-2">
            <MyDatePicker
              onChange={(value: Date) => {
                setRequestForm((prev) => {
                  return { ...prev, tripDuration: value };
                });
              }}
              selected={requestForm.tripDuration}
              placeholderText="Date Of Trip"
            />
            <MyDatePicker
              onChange={(value: Date) => {
                setRequestForm((prev) => {
                  return { ...prev, tripDuration: value };
                });
              }}
              selected={requestForm.tripDuration}
              placeholderText="Time Of Trip"
              showTimeSelect={true}
            />
          </div>

          <FormInput
            label=""
            placeholder="Field trip initiated by"
            onChange={handleChange}
            value={requestForm.initiatedBy}
            name="initiatedBy"
            required
          />

          <Button className="mb-4 bg-[#32D583]">Submit</Button>
        </form>
      </div>
      {makeRequest.isLoading ? <ScreenLoader /> : null}
    </div>
  );
};

export default Home;
