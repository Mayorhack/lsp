import { ResponseService } from "@/types";
import axios, { AxiosResponse } from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await axios.request<AxiosResponse<ResponseService<any>>>({
          url: process.env.NEXTAUTH_URL + "/login",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            username: credentials?.username,
            password: credentials?.password,
          },
        });

        const user = res.data.data.data;

        if (res.data.data.code == "00") {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
});
