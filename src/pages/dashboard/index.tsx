import Overlay from "@/components/Overlay";
import { useState } from "react";
import DashboardGrid from "@/layout/dashboardGrid";
import LineGraph from "../../layout/lineChart/index";

const Dashboard = () => {
  const [openState, setOpenState] = useState(false);
  const openModal = () => {
    setOpenState(true);
  };
  const closeModal = () => {
    setOpenState(false);
  };
  return (
    <>
      <div className="">
        <DashboardGrid />
      </div>
      <div>
        <LineGraph />
      </div>
    </>
  );
};

export default Dashboard;
