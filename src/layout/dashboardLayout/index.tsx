import React from "react";

import { useRouter } from "next/router";

import Sidebar from "@/layout/sidebar";
import Header from "../header";

type DashboardLayoutPropsType = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutPropsType) => {
  const router = useRouter();

  return (
    <div className="">
      <Sidebar />
      <div className=" bg-[#f9f9f9] lg:ml-[250px] lg:px-14 px-8 min-h-screen">
        <Header />
        <main className="">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
