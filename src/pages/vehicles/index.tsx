import Overlay from "@/components/Overlay";
import { useState } from "react";
import DashboardGrid from "@/layout/dashboardGrid";

const Vehicles = () => {
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
      <div onClick={openModal}>Enter</div>
      <Overlay openState={openState} closeModal={closeModal}>
        <div className="">bfksdj</div>
      </Overlay>
    </>
  );
};

export default Vehicles;
