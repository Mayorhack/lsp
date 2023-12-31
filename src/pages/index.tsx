import React from "react";
import Logo from "../images/logo.svg";
import FormSelect from "@/components/forms/FormSelect";
import FormInput from "@/components/forms/FormInput";
import Image from "next/image";

const index = () => {
  return (
    <div className="container mx-auto">
      <div className="container flex justify-center items-center flex-col">
        <span className="flex justify-center items-centercursor-pointer my-6 w-full">
          <Image src={Logo} alt="Logo" />
        </span>
        <div className="container flex justify-center items-center flex-col py-8 text-[#101828]">
          <h1 className="font-semibold text-[25px] leading-[25px] md:text-[48px] md:leading-[30px] md:w-[474px] md:h-[28px]">
            Vehicle Request Form
          </h1>
          <p className="text-center mt-4">
            Please fill the form with accurate information.
          </p>
        </div>
        <div className="container grid grid-flow-row mt-2 px-6 lg:w-[760px] lg:h-[84px]">
          <FormSelect options={[]} placeholder="Vehicle Type" />
          <FormInput label="" placeholder="Destination" />
          <FormInput label="" placeholder="Purpose of use " />
          <FormInput
            label=""
            placeholder="Number of Officers to go on field trip"
          />
          <FormInput
            label=""
            placeholder="Estimated duration of field trip (Hours)"
          />
          <FormInput label="" placeholder="Field trip initiated by" />
          <FormInput label="" placeholder="Field trip approved by" />
        </div>
      </div>
    </div>
  );
};

export default index;
