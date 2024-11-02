import { errorHandler } from "@/lib/errorHandler";
import connectToMongoDb from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import DownloadCounts from "@/models/download-count";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { method, body } = req;
    const payload: any = body;

    await connectToMongoDb();
    switch (method) {
      case "GET": {
        const count = await DownloadCounts.findOne();

        if (!count) {
          return res.status(404).json({ message: "Counts not found" });
        }

        // Return the publicationCount
        return res
          .status(200)
          .json({ publicationCount: count.publicationCount });
      }
      case "POST": {
        if (!payload.type && !payload.count) {
          throw new Error("Information Incomplete", { cause: 400 });
        }
        let counts = await DownloadCounts.findOne();
        if (!counts) {
          counts = new DownloadCounts();
        }
        if (payload.type === "publication") {
          counts.publicationCount += 1;
        } else if (payload.type === "report") {
          counts.reportCount += 1;
        } else {
          counts.otherCount += 1;
        }
        await counts.save();
        return res.status(200).json({
          code: "00",
          message: " Successfully",
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
