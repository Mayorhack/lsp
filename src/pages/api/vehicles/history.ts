import { errorHandler } from "@/lib/errorHandler";
import connectToMongoDb from "@/lib/mongodb";
import { ResponseService, VehicleType } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import { authenticateJWT } from "@/lib/jwtHandler";
import Vehicle from "@/models/vehicles";
import VehicleRequest from "@/models/request";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseService<any>>
) {
  try {
    const { code, error } = authenticateJWT(req);
    if (code != 200) {
      throw new Error(error, { cause: code });
    }
    const { method, body, query } = req;
    const payload: VehicleType = body;

    await connectToMongoDb();
    switch (method) {
      case "GET": {
        const pageIndex = Number(query.pageIndex) || 0;
        const pageSize = Number(query.pageSize) || 10;
        console.log(query.vehicle);

        let hasNextPage;
        let hasPrevPage;
        let totalPages;
        const count = await VehicleRequest.find({
          vehicle: query.vehicle,
        }).countDocuments();

        if (count) {
          hasNextPage = (pageIndex + 1) * pageSize < count;
          hasPrevPage = pageIndex > 1;
          totalPages = Math.ceil(count / pageSize);
        }
        const requests = await VehicleRequest.find({
          vehicle: query.vehicle,
        }).populate("vehicle");
        if (requests != null)
          return res.status(200).json({
            code: "00",
            hasNextPage,
            hasPrevPage,
            totalPages,
            data: requests,
          });
        else {
          throw new Error("Could fetch Vehicles", { cause: 400 });
        }
      }
      case "POST": {
        if (payload.vehicleId) {
          await Vehicle.findOneAndUpdate(
            { vehicleId: payload.vehicleId },
            { ...payload, requestId: "" },
            { new: true }
          );
          return res.status(201).json({
            code: "00",
            message: "Vehicle Updated Successfully",
          });
        }
        if (!payload.vehicleName && !payload.color && !payload.plateNumber) {
          throw new Error("Information Incomplete", { cause: 400 });
        }

        await Vehicle.create({
          ...payload,
        });
        return res.status(201).json({
          code: "00",
          message: "Vehicle Created Successfully",
        });
      }
      default:
        res.setHeader("Allow", ["GET", "PUT", "POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error: any) {
    errorHandler(error, res);
  }
}
