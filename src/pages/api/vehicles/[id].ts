import { authenticateJWT } from "@/lib/jwtHandler";
import Vehicle from "@/models/vehicles";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function requestHandler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { query, method } = req;
  const id = query.id as string;
  const name = query.name as string;
  const { code, error } = authenticateJWT(req);
  if (code != 200) {
    throw new Error(error, { cause: code });
  }

  switch (method) {
    case "GET": {
      const vehicle = await Vehicle.findOne({ _id: id });
      if (vehicle)
        return res.status(200).json({
          code: "00",
          data: vehicle,
        });
      break;
    }
    case "PUT":
      res.status(200).json({ id, name: name || `User ${id}` });
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
