import { errorHandler } from "@/lib/errorHandler";
import { authenticateJWT } from "@/lib/jwtHandler";
import connectToMongoDb from "@/lib/mongodb";
import VehicleRequest from "@/models/request";
import { ApprovalPayload, ResponseService } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function requestHandler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseService<any>>
) {
  try {
    await connectToMongoDb();
    const { code, error } = authenticateJWT(req);
    if (code != 200) {
      throw new Error(error, { cause: code });
    }
    const { body, method } = req;
    const { requestId, approvedBy, status }: ApprovalPayload = body;
    switch (method) {
      case "POST": {
        const vehiclerequest = await VehicleRequest.findOneAndUpdate(
          { requestId },
          { status: status === "Y" ? "Approved" : "Rejected", approvedBy },
          { new: true }
        );
        if (vehiclerequest) {
          return res
            .status(200)
            .json({ code: "00", message: "Record Updated Successfully" });
        } else if (!vehiclerequest) {
          throw new Error("Could not find record", { cause: 400 });
        } else {
          throw new Error("Could not update record", { cause: 400 });
        }
      }
      default:
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error: any) {
    errorHandler(error, res);
  }
}
