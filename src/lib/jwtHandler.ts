import { NextApiRequest } from "next";
import jwt from "jsonwebtoken";
const jwtKey = process.env.SECRET_KEY || "";

export const authenticateJWT = (req: NextApiRequest) => {
  const authToken = req.headers.authorization;

  if (authToken && authToken.startsWith("Bearer ")) {
    const token = authToken.split(" ")[1];

    if (!token) {
      return { error: "Unauthorized", code: 401 };
    }
    const resp = { error: "Forbidden", code: 403 };
    jwt.verify(token, jwtKey, (err) => {
      if (err) {
        resp.error = "Forbidden";
        resp.code = 403;
      } else {
        resp.error = "";
        resp.code = 200;
      }
    });
    return resp;
  } else {
    return { error: "Unauthorized", code: 401 };
  }
};
export const signJwt = (user: any) => {
  return jwt.sign({ username: user.username }, jwtKey, {
    expiresIn: "3h",
  });
};
