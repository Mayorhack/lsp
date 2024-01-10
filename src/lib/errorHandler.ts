import { ResponseService } from "@/types";
import { NextApiResponse } from "next";

export function errorHandler(
  err: Error,
  res: NextApiResponse<ResponseService<any>>
) {
  return res.status(Number(err.cause) || 500).json({
    code: "01",
    message: err.message || "Internal Server Error",
    error: err,
  });
}
