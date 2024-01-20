import { errorHandler } from "@/lib/errorHandler";
import { authenticateJWT } from "@/lib/jwtHandler";
import connectToMongoDb from "@/lib/mongodb";
import VehicleRequest from "@/models/request";
import { RequestFilters, ResponseService, VehicleRequestType } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    ResponseService<VehicleRequestType[] | VehicleRequestType>
  >
) {
  try {
    const { method, body, query } = req;
    const payload: VehicleRequestType = body;

    await connectToMongoDb();
    switch (method) {
      case "GET": {
        const { code, error } = authenticateJWT(req);
        if (code != 200) {
          throw new Error(error, { cause: code });
        }
        const pageIndex = Number(query.pageIndex) || 0;
        const pageSize = Number(query.pageSize) || 10;
        let filters: RequestFilters = {};
        if (query.username) {
          filters.username = query.username;
        }
        let hasNextPage;
        let hasPrevPage;
        let totalPages;
        const count = await VehicleRequest.find(filters).countDocuments();
        if (count) {
          hasNextPage = (pageIndex + 1) * pageSize < count;
          hasPrevPage = pageIndex > 1;
          totalPages = Math.ceil(count / pageSize);
        }
        const requests: VehicleRequestType[] = await VehicleRequest.find(
          filters
        )
          .skip(pageIndex)
          .limit(pageSize);
        if (requests != null)
          return res.status(200).json({
            code: "00",
            data: requests,
            hasNextPage,
            hasPrevPage,
            totalPages,
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
          !payload.officersCount &&
          !payload.tripDuration &&
          !payload.initiatedBy
        ) {
          throw new Error("Payload Incomplete", { cause: 400 });
        }
        await VehicleRequest.create({ ...payload, status: "Pending" });
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
