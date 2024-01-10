import { errorHandler } from "@/lib/errorHandler";
import connectToMongoDb from "@/lib/mongodb";
import VehicleRequest from "@/models/request";
import { ResponseService, VehicleRequestType } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    ResponseService<VehicleRequestType[] | VehicleRequestType>
  >
) {
  try {
    const { method, body } = req;
    const payload: VehicleRequestType = body;

    await connectToMongoDb();
    switch (method) {
      case "GET": {
        const requests: VehicleRequestType[] = await VehicleRequest.find();
        if (requests != null)
          return res.status(200).json({
            code: "00",
            data: requests,
          });
        else {
          throw new Error("Could fetch request", { cause: 400 });
        }
      }
      case "POST":
        if (
          !payload.vehicleType &&
          !payload.purpose &&
          !payload.destination &&
          !payload.approvedBy &&
          !payload.officersCount &&
          !payload.tripDuration &&
          !payload.initiatedBy
        ) {
          throw new Error("Payload Incomplete", { cause: 400 });
        }
        await VehicleRequest.create(payload);
        return res.status(201).json({
          code: "00",
          data: payload,
          message: "Created Successfully",
        });
      default:
        res.setHeader("Allow", ["GET", "PUT", "POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error: any) {
    errorHandler(error, res);
  }
}
