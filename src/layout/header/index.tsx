import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { signOut } from "next-auth/react";
import React from "react";
import { FiBell, FiChevronDown } from "react-icons/fi";
import { MdLogout } from "react-icons/md";

const Header = ({ name }: { name: string }) => {
  return (
    <div className="flex justify-end items-center pt-5">
      <div className="flex justify-between items-center mr-5">
        <FiBell color="bg-primary " size={14} />
      </div>
      <div className="flex items-center gap-3">
        <p className=" text-xs truncate ...">
          <span className="block font-semibold capitalize">{name}</span>
        </p>
        <Popover>
          <PopoverTrigger>
            <FiChevronDown />
          </PopoverTrigger>
          <PopoverContent className="p-0 pt-3">
            <div className="w-20 sm:w-24   bg-white ">
              <div className="bg-red-400 text-white px-2 py-2">
                <p
                  className=" flex items-center gap-1 cursor-pointer text-sm"
                  onClick={() => signOut({ callbackUrl: "/auth/login" })}
                >
                  <MdLogout size={16} />
                  Log out
                </p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Header;
