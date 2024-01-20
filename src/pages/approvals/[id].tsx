import Button from "@/components/Button";
import Overlay from "@/components/Overlay";
import { RequestDetails, ResponseService } from "@/types";
import { formatDate } from "@/utils";
import axiosInstance from "@/utils/axios-instance";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

const Details = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useQuery<AxiosResponse<ResponseService<RequestDetails>>>(
    ["requestById"],
    () =>
      axiosInstance.request({
        method: "GET",
        url: `/requests/${id}`,
      })
  );
  const vehicleData = data?.data.data;
  const [openApproveState, setOpenApproveState] = useState(false);
  const openApproveModal = () => {
    setOpenApproveState(true);
  };
  const closeApproveModal = () => {
    setOpenApproveState(false);
  };
  return (
    <>
      <div className="bg-white max-w-lg w-full rounded-md p-4">
        <h2 className="text-2xl font-bold">Vehicle Request Details</h2>
        <p
          className={`text-lg ${
            vehicleData?.status === "Approved"
              ? "text-green-600"
              : vehicleData?.status === "Pending"
              ? "text-yellow-400"
              : "text-red-400"
          }`}
        >
          {vehicleData?.status}
        </p>
        <div className="grid grid-cols-2 gap-y-5 my-6">
          <p>Vehicle Name</p>
          <p className="text-lg font-bold">{vehicleData?.vehicleType}</p>
          <p>Date Created</p>
          <p className="text-lg font-bold">
            {formatDate(vehicleData?.createdAt || "")}
          </p>
          <p>Destination</p>
          <p className="text-lg font-bold">{vehicleData?.destination}</p>{" "}
          <p>Purpose</p>
          <p className="text-lg font-bold">{vehicleData?.purpose}</p>{" "}
          <p>Officers Count</p>
          <p>{vehicleData?.officersCount}</p> <p>Trip Duration</p>
          <p className="text-lg font-bold">
            {formatDate(vehicleData?.tripDuration || "")}
          </p>{" "}
          <p>Initiated By</p>
          <p className="text-lg font-bold">{vehicleData?.initiatedBy}</p>
          <p>Approved By</p>
          <p className="text-lg font-bold">{vehicleData?.approvedBy}</p>
        </div>
        <div className="flex justify-between">
          <Button className="w-40 bg-green-600" onClick={openApproveModal}>
            Approve
          </Button>
          <Button className="w-40 ">Assign Driver</Button>
        </div>
      </div>
      <Overlay openState={openApproveState} closeModal={closeApproveModal}>
        <div className="">bfksdj</div>
      </Overlay>
    </>
  );
};

export default Details;
