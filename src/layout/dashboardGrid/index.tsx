// Grid.tsx

import React from "react";
import { FaCar, FaClock } from "react-icons/fa";
import { HiOutlineDocumentPlus } from "react-icons/hi2";

const gridDetailss = [
  {
    id: 1,
    title: "Number of Requests",
    value: 200,
    // text: "12%",
    icon: <HiOutlineDocumentPlus className="text-indigo-500 text-3xl" />,
  },
  {
    id: 2,
    title: "Pending approvals",
    value: 5,
    icon: <FaClock className="text-yellow-500 text-3xl" />,
  },
  {
    id: 3,
    title: "Number of available vehicles",
    value: 1200,
    icon: <FaCar className="text-purple-700 text-3xl" />,
    // button: "Sell Shares",
    // shares: "shares available",
  },
];

const DashboardGrid = ({ count }: { count: any }) => {
  return (
    <div className="font-inter mt-10">
      <div className="grid grid-cols-240 gap-5 lg:gap-6">
        {gridDetailss.map((gridDetail) => (
          <div
            className="bg-white rounded-xl shadow-sm px-4 border-[1px] border-[#EAECF0] py-5 lg:p-6 h-[158px] lg:h-[176px]"
            key={gridDetail.title}
          >
            {gridDetail.icon}
            <div className="flex justify-between items-center mt-5 lg:mt-6">
              <p className="font-semibold text-[30px] lg:text-[36px] leading-[38px] lg:leading-[44px] ">
                {gridDetail.id === 1
                  ? count?.requestCount
                  : gridDetail.id === 2
                  ? count?.pendingCount
                  : count?.vehicleCount}
              </p>
            </div>
            <h2 className="font-[#101828] text-base font-medium">
              {gridDetail.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardGrid;
