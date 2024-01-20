import { FaBatteryEmpty } from "react-icons/fa";

const NoDataComponent = () => {
  return (
    <div className="w-full grid place-items-center h-full min-h-[calc(100vh-260px)] bg-white mt-10">
      <EmptyTable />
    </div>
  );
};

export default NoDataComponent;

const EmptyTable = () => {
  return <NoData />;
};

// Admin
const NoData = () => {
  return (
    <div className="grid gap-5 text-center max-w-xs ">
      <div className="flex items-center justify-center">
        <FaBatteryEmpty size={90} />
      </div>
      <h4 className="font-medium">No Data</h4>
      <p className="text-sm">Audit logs of users will appear here.</p>
    </div>
  );
};
