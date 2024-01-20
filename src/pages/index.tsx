import React, { useState } from "react";
import Logo from "../images/logo.svg";
import FormSelect from "@/components/forms/FormSelect";
import FormInput from "@/components/forms/FormInput";
import Image from "next/image";
import Button from "@/components/Button";
import { VehicleRequestType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios-instance";
import ScreenLoader from "@/components/ScreenLoader";
import { notifySuccess } from "@/utils/notifier";

const Home = () => {
  const [requestForm, setRequestForm] = useState<VehicleRequestType>({
    vehicleType: "",
    destination: "",
    purpose: "",
    officersCount: "",
    tripDuration: new Date(),
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
      return { ...prev, [name]: value };
    });
  };
  const makeRequest = useMutation(
    () =>
      axiosInstance.request({
        url: "/requests",
        method: "POST",
        data: requestForm,
      }),
    {
      onSuccess: () => {
        notifySuccess("SuccessFul");
        setRequestForm({
          vehicleType: "",
          destination: "",
          purpose: "",
          officersCount: "",
          tripDuration: new Date(),
          initiatedBy: "",
          status: "",
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
          <h1 className="font-semibold text-[25px] leading-[25px] md:text-[48px] md:leading-[30px] md:w-[474px] md:h-[28px]">
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
          <FormSelect
            options={[{ name: "test", code: "TEST" }]}
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
          <FormInput
            label=""
            placeholder="Estimated duration of field trip (Hours)"
            onChange={handleChange}
            value={requestForm.tripDuration?.toString()}
            name="tripDuration"
            required
          />
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
