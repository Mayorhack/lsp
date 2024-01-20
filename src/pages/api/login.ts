import connectToMongoDb from "@/lib/mongodb";
import User from "@/models/user";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

import { ResponseService } from "@/types";
import { errorHandler } from "@/lib/errorHandler";
import { signJwt } from "@/lib/jwtHandler";
export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseService<any>>
) {
  try {
    const { method, body } = req;

    await connectToMongoDb();
    switch (method) {
      case "POST": {
        const { username, password } = body;

        const user = await User.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
          const token = signJwt(user);
          // res.setHeader("Set-Cookie", `myCookie=${token}; Path=/; HttpOnly`);
          const resp = res.status(200).json({
            code: "00",
            message: "Login Successful",
            data: {
              username,
              token,
            },
          });

          return resp;
        } else {
          throw new Error("Unauthenticated", { cause: 401 });
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
