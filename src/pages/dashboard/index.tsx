import Overlay from "@/components/Overlay";
import { useState } from "react";

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
      <div onClick={openModal}>Enter</div>
      <Overlay openState={openState} closeModal={closeModal}>
        <div className="">jkdjkhddjdjdj</div>
      </Overlay>
    </>
  );
};

export default Dashboard;
