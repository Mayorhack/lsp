import DashboardGrid from "@/layout/dashboardGrid";
import LineGraph from "../../layout/lineChart/index";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios-instance";
import { ResponseService } from "@/types";
import { AxiosResponse } from "axios";

const Dashboard = () => {
  const { data } = useQuery<AxiosResponse<ResponseService<any>>>(
    ["dashboard"],
    () =>
      axiosInstance.request({
        method: "GET",
        url: "/dashboard",
      })
  );
  const counts = data?.data.data;
  return (
    <>
      <div className="">
        <DashboardGrid count={counts} />
      </div>
      <div>
        <LineGraph />
      </div>
    </>
  );
};

export default Dashboard;
