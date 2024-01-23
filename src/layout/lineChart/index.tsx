// Import necessary packages
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Example data (replace with your actual data)
const data = [
  { name: "Jan", requests: 10, availableVehicles: 50 },
  { name: "Feb", requests: 15, availableVehicles: 45 },
  { name: "Mar", requests: 20, availableVehicles: 40 },
  // Add more data points as needed
];

// Define the LineChart component
const LineGraph = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 50, right: 20, left: 5, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="requests"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="availableVehicles" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineGraph;
