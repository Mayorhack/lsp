import { errorHandler } from "@/lib/errorHandler";
import connectToMongoDb from "@/lib/mongodb";
import User from "@/models/user";
import { ResponseService, UserFilters, UserType } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { authenticateJWT } from "@/lib/jwtHandler";
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
    const payload: UserType = body;

    await connectToMongoDb();
    switch (method) {
      case "GET": {
        const pageIndex = Number(query.pageIndex) || 0;
        const pageSize = Number(query.pageSize) || 10;
        let filters: UserFilters = {};
        if (query.username) {
          filters.username = query.username;
        }
        let hasNextPage;
        let hasPrevPage;
        let totalPages;
        const count = await User.find(filters).countDocuments();

        if (count) {
          hasNextPage = (pageIndex + 1) * pageSize < count;
          hasPrevPage = pageIndex > 1;
          totalPages = Math.ceil(count / pageSize);
        }

        const users = await User.find(filters)
          .select("-password")
          .skip(pageIndex)
          .limit(pageSize);

        if (users != null)
          return res.status(200).json({
            code: "00",
            hasNextPage,
            hasPrevPage,
            totalPages,
            data: users,
          });
        else {
          throw new Error("Could fetch user", { cause: 400 });
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
