import React from "react";
import Logo from "../images/logo.svg";
import FormSelect from "@/components/forms/FormSelect";
import FormInput from "@/components/forms/FormInput";

const index = () => {
  return (
    <>
      <div>
        <span className="lg:w-[475px] h-[136px] flex justify-center items-center  cursor-pointer  ">
          <img src={Logo} alt="Logo" />
        </span>
        <div className=" container px-4">
          <h1 className="font-semibold text-[#101828] text-[25px] leading-[25px] md:text-[48px] md:leading-[30px] text-start md:w-[474px] md:h-[28px]">
            Vehicle Request Form
          </h1>
          <p className="mt-4">
            Please fill the form with accurate information.
          </p>
        </div>
        <div className="grid grid-flow-row mt-[49px] px-4 w-[760px] h-[84px]">
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
    </>
  );
};

export default index;
