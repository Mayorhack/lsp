import { DataTable } from "@/components/data-table";
import { columns } from "@/data/columns/history-column";
import { TableFilters } from "@/types";
import axiosInstance from "@/utils/axios-instance";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const Details = () => {
  const router = useRouter();
  const { id } = router.query;
  const [filters, setFilters] = useState<TableFilters>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { data: historyData, isLoading } = useQuery(["history"], () =>
    axiosInstance.request({
      method: "get",
      url: "/requests",
      params: {
        vehicle: id,
      },
    })
  );
  const { data: vehicleData } = useQuery(["vehicle"], () =>
    axiosInstance.request({
      method: "get",
      url: `/vehicles/${id}`,
      params: {
        id,
      },
    })
  );
  const vehicleInfo = vehicleData?.data.data;
  const historyList = historyData?.data.data || [];
  return (
    <div className="">
      <h3 className="text-2xl font-medium">Vehicle Details</h3>
      <div className="grid sm:grid-cols-[1fr,2fr] gap-6 mt-4">
        <div className="bg-white">
          {" "}
          <div className="grid grid-cols-2 gap-y-5  p-4">
            <p>Vehicle Name</p>
            <p className="text-lg font-bold">{vehicleInfo.vehicleName}</p>
            <p>Plate Number</p>
            <p className="text-lg font-bold">{vehicleInfo.plateNumber}</p>
            <p>Color</p>
            <p className="text-lg font-bold">{vehicleInfo.color}</p>{" "}
            <p>Status</p>
            <p className="text-lg font-bold">{vehicleInfo.status}</p>{" "}
          </div>
        </div>
        <div className="-mt-10">
          <DataTable
            columns={columns}
            dataList={historyList}
            filters={filters}
            setFilters={setFilters}
            hasNextPage={historyData?.data.hasNextPage}
            hasPreviousPage={historyData?.data.hasPrevPage}
            totalPages={historyData?.data.totalPages}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Details;
