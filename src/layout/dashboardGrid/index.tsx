// Grid.tsx

import React from "react";

const gridDetailss = [
  {
    id: 1,
    title: "Number of Requests",
    value: 200,
    // text: "12%",
    // icon: arrowUp,
  },
  { id: 2, title: "Pending approvals", value: 5 },
  {
    id: 3,
    title: "Number of available vehicles",
    value: 1200,
    // button: "Sell Shares",
    // shares: "shares available",
  },
];

const DashboardGrid: React.FC = ({ count }: any) => {
  return (
    <div className="font-inter">
      <div className="grid grid-cols-240 gap-5 lg:gap-6 m-4 lg:m-8">
        {gridDetailss.map((gridDetail) => (
          <div
            className="bg-white rounded-xl shadow-sm px-4 border-[1px] border-[#EAECF0] py-5 lg:p-6 h-[158px] lg:h-[176px]"
            key={gridDetail.title}
          >
            <h2 className="font-[#101828] text-base font-medium">
              {gridDetail.title}
            </h2>
            <div className="flex justify-between items-center mt-5 lg:mt-6">
              <p className="font-semibold text-[30px] lg:text-[36px] leading-[38px] lg:leading-[44px] ">
                {gridDetail.id === 1
                  ? count?.requestCount
                  : gridDetail.id === 2
                  ? count?.pendingCount
                  : gridDetail.value}
              </p>
              {/* <div className="flex items-center">
                {gridDetail?.shares ? (
                  <div className="font-[#101828] text-base font-medium">
                    {gridDetail.shares}
                  </div>
                ) : null}
              </div> */}
            </div>
            {/* <div className="">
              {" "}
              {gridDetail?.button ? (
                <button className="mt-2 py-2 w-[108px] h-[40px] text-[14px] font-semibold leading-5 text-[#fff] bg-primary border-[1px] rounded-lg mb-[14px]">
                  {gridDetail.button}
                </button>
              ) : null}
            </div> */}
            {/* {gridDetail?.text ? (
              <div className="flex mt-4">
                <Image className="w-5 h-5" src={arrowUp} alt="" />
                <p className="font-medium text-[14px] leading-5 mr-2 text-[#027A48]">
                  {gridDetail.text}
                </p>
                <p className="font-medium text-[14px] leading-5">
                  vs last month
                </p>
              </div>
            ) : null} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardGrid;
