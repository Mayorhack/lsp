import { errorHandler } from "@/lib/errorHandler";
import connectToMongoDb from "@/lib/mongodb";
import User from "@/models/user";
import { ResponseService, UserType } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { authenticateJWT } from "@/lib/jwtHandler";
import VehicleRequest from "@/models/request";
import Vehicle from "@/models/vehicles";
import { months } from "@/data";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseService<any>>
) {
  try {
    const { code, error } = authenticateJWT(req);
    if (code != 200) {
      throw new Error(error, { cause: code });
    }
    const { method, body } = req;
    const payload: UserType = body;

    await connectToMongoDb();
    switch (method) {
      case "GET": {
        const userCount = await User.find().countDocuments();
        const requestCount = await VehicleRequest.find().countDocuments();
        const recentRequest = await VehicleRequest.find()
          .sort({ createdAt: "desc" })
          .limit(5);
        const requestSummary = await VehicleRequest.aggregate([
          {
            $project: {
              month: { $month: "$tripDuration" }, // Extract month from the createdAt field
              request: 1, // Keep the request field
            },
          },
          {
            $group: {
              _id: { month: "$month" }, // Group by year and month
              totalRequests: { $sum: 1 }, // Count the number of requests for each group
            },
          },
          {
            $sort: {
              "_id.month": 1,
            },
          },
        ]);
        const requestSummaryList = requestSummary.map((item) => {
          return {
            name: item._id.month,
            requests: item.totalRequests,
          };
        });
        const requestList = months.map((_, i) => {
          const found = requestSummaryList.find((obj) => obj.name === i + 1);
          return found ? found : { name: i + 1, requests: 0 };
        });
        const pendingCount = await VehicleRequest.find({
          status: "Pending",
        }).countDocuments();
        const vehicleCount = await Vehicle.find().countDocuments();
        if (userCount != null)
          return res.status(200).json({
            code: "00",
            data: {
              userCount,
              requestCount,
              pendingCount,
              vehicleCount,
              requestList,
              recentRequest,
            },
          });
        else {
          throw new Error("Could fetch dashboard data", { cause: 400 });
        }
      }
      case "POST": {
        if (
          !payload.firstname &&
          !payload.lastname &&
          !payload.password &&
          !payload.email
        ) {
          throw new Error("Information Incomplete", { cause: 400 });
        }
        const hashedPassword = await bcrypt.hash(payload.password, 10);
        await User.create({
          ...payload,
          password: hashedPassword,
          status: "active",
        });
        return res.status(201).json({
          code: "00",
          message: "User Created Successfully",
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
