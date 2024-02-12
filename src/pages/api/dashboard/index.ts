import { errorHandler } from "@/lib/errorHandler";
import connectToMongoDb from "@/lib/mongodb";
import User from "@/models/user";
import { ResponseService, UserType } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { authenticateJWT } from "@/lib/jwtHandler";
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
    const { method, body } = req;
    const payload: UserType = body;

    await connectToMongoDb();
    switch (method) {
      case "GET": {
        const userCount = await User.find().countDocuments();
        const requestCount = await VehicleRequest.find().countDocuments();
        const pendingCount = await VehicleRequest.find({
          status: "Pending",
        }).countDocuments();
        if (userCount != null)
          return res.status(200).json({
            code: "00",
            data: { userCount, requestCount, pendingCount },
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
