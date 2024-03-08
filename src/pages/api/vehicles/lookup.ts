import { errorHandler } from "@/lib/errorHandler";
import connectToMongoDb from "@/lib/mongodb";
import { ResponseService, VehicleFilters } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import Vehicle from "@/models/vehicles";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseService<any>>
) {
  try {
    const { method, query } = req;

    await connectToMongoDb();
    switch (method) {
      case "GET": {
        const pageIndex = Number(query.pageIndex) || 0;
        const pageSize = Number(query.pageSize) || 10;
        let filters: VehicleFilters = {};
        if (query.color) {
          filters.color = query.color;
        }
        if (query.plateNumber) {
          filters.plateNumber = query.plateNumber;
        }
        if (query.vehicleName) {
          filters.vehicleName = query.vehicleName;
        }
        if (query.status) {
          filters.status = "Active";
        }

        let hasNextPage;
        let hasPrevPage;
        let totalPages;
        const count = await Vehicle.find(filters).countDocuments();

        if (count) {
          hasNextPage = (pageIndex + 1) * pageSize < count;
          hasPrevPage = pageIndex > 1;
          totalPages = Math.ceil(count / pageSize);
        }
        const vehicles = await Vehicle.find({
          ...filters,
          status: "Active",
        })
          .skip(pageIndex)
          .limit(pageSize);
        if (vehicles != null)
          return res.status(200).json({
            code: "00",
            hasNextPage,
            hasPrevPage,
            totalPages,
            data: vehicles,
          });
        else {
          throw new Error("Could fetch Vehicles", { cause: 400 });
        }
      }

      default:
        res.setHeader("Allow", ["GET", "PUT", "POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error: any) {
    errorHandler(error, res);
  }
}
