import React, { useEffect } from "react";

import Sidebar from "@/layout/sidebar";
import Header from "../header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ScreenLoader from "@/components/ScreenLoader";

type DashboardLayoutPropsType = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutPropsType) => {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);
  useEffect(() => {
    if (typeof window != "undefined") {
      // @ts-ignore
      window.localStorage.setItem("token", data?.token);
    }
    // @ts-ignore
  }, [data?.token]);

  if (status === "loading") return <ScreenLoader />;
  return (
    <div className="">
      <Sidebar />
      <div className=" bg-[#f9f9f9] lg:ml-[240px] lg:px-14 px-8 min-h-screen">
        <Header name={data?.username || ""} />
        <main className=" mt-20">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
