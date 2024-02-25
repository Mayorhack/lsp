import DashboardGrid from "@/layout/dashboardGrid";
import LineGraph from "../../layout/lineChart/index";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios-instance";
import { ResponseService } from "@/types";
import { AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import { months } from "@/data";

const Dashboard = () => {
  const { data } = useQuery<AxiosResponse<ResponseService<any>>>(
    ["dashboard"],
    () =>
      axiosInstance.request({
        method: "GET",
        url: "/dashboard",
      })
  );
  const { data: session } = useSession();
  const counts = data?.data.data;

  const requestSummary = data?.data.data.requestList?.length
    ? months.map((item, i) => {
        if (data.data.data.requestList[i]) {
          return {
            ...item,
            requests: data.data.data.requestList[i].requests,
          };
        }
        return item;
      })
    : [];

  return (
    <>
      <div className="">
        <p className="text-2xl capitalize">Welcome {session?.username}</p>
        <DashboardGrid count={counts} />
      </div>
      <div>
        <LineGraph requestSummary={requestSummary} />
      </div>
    </>
  );
};

export default Dashboard;
