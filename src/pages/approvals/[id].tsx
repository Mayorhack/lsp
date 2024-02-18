import Button from "@/components/Button";
import Overlay from "@/components/Overlay";
import FormInput from "@/components/forms/FormInput";
import { RequestDetails, ResponseService } from "@/types";
import { formatDate } from "@/utils";
import axiosInstance from "@/utils/axios-instance";
import { successAlert } from "@/utils/sweetAlert";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

const Details = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();

  const { data } = useQuery<AxiosResponse<ResponseService<RequestDetails>>>(
    ["requestById"],
    () =>
      axiosInstance.request({
        method: "GET",
        url: `/requests/${id}`,
      })
  );
  const [driver, setDriver] = useState("");
  const approveRequest = useMutation(
    () =>
      axiosInstance.request({
        url: "/requests/approve",
        method: "POST",
        data: { requestId: id, approvedBy: session?.username, status: "Y" },
      }),
    {
      onSuccess: (data) => {
        successAlert(data?.data.message || "Record Updated Successfully");
        closeApproveModal();
      },
    }
  );
  const assignRequest = useMutation(
    () =>
      axiosInstance.request({
        url: "/requests/assign",
        method: "POST",
        data: { requestId: id, driver },
      }),
    {
      onSuccess: (data) => {
        successAlert(data?.data.message || "Record Updated Successfully");
        closeAssignModal();
      },
    }
  );
  const vehicleData = data?.data.data;
  const [openApproveState, setOpenApproveState] = useState(false);
  const openApproveModal = () => {
    setOpenApproveState(true);
  };
  const closeApproveModal = () => {
    setOpenApproveState(false);
  };
  const [openAssignState, setOpenAssignState] = useState(false);
  const openAssignModal = () => {
    setOpenAssignState(true);
  };
  const closeAssignModal = () => {
    setOpenAssignState(false);
  };
  return (
    <>
      <Link
        href={"/approvals"}
        className="cursor-pointer flex items-center gap-1 mb-4"
      >
        <FiArrowLeft /> Back
      </Link>
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
          <p className="text-lg font-bold">
            {vehicleData?.approvedBy || "None"}
          </p>
          <p>Driver</p>
          <p className="text-lg font-bold">{vehicleData?.driver || "None"}</p>
        </div>
        <div className="flex justify-between">
          <Button
            className="w-40 bg-green-600"
            onClick={openApproveModal}
            disabled={vehicleData?.status === "Approved"}
          >
            Approve
          </Button>
          <Button className="w-40 bg-blue-500" onClick={openAssignModal}>
            Assign Driver
          </Button>
        </div>
      </div>
      <Overlay
        openState={openApproveState}
        closeModal={closeApproveModal}
        size={"sm"}
      >
        <div className="p-4 text-center">
          <h3 className="text-2xl">
            Are you sure you want to perform this action
          </h3>
          <div className="flex justify-center">
            <Button
              onClick={() => approveRequest.mutate()}
              className="w-40 p-2 h-10 mt-4"
            >
              Yes
            </Button>
          </div>
        </div>
      </Overlay>
      <Overlay
        openState={openAssignState}
        closeModal={closeAssignModal}
        size={"sm"}
      >
        <div className="p-4 text-center">
          <h3 className="text-2xl">
            Please input the driver&apos;s name to be assign to this request
          </h3>
          <div className="mt-4">
            <FormInput
              placeholder="Input Driver Name"
              name="driver"
              value={driver}
              onChange={(e) => setDriver(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <Button
              onClick={() => assignRequest.mutate()}
              className="w-40 p-2 h-10 mt-4"
            >
              Submit
            </Button>
          </div>
        </div>
      </Overlay>
    </>
  );
};

export default Details;
