import { ResponseService } from "@/types";
import axios from "axios";
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
        const res = await axios.request<ResponseService<any>>({
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

        const user = res.data.data;

        if (res.data.code == "00") {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
});
