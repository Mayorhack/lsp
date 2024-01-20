import React from "react";
import { FiBell } from "react-icons/fi";

const Header = () => {
  return (
    <div className="flex justify-end items-center pt-10">
      <div className="flex justify-between items-center mr-5">
        <FiBell color="bg-primary " size={14} />
      </div>
      <div className="flex items-center w-[144px]">
        <p className=" text-xs truncate ...">
          <span className="block font-semibold"></span>
        </p>
      </div>
    </div>
  );
};

export default Header;
