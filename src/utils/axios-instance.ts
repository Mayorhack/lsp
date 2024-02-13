import axios from "axios";
import { notifyError } from "./notifier";
import { signOut } from "next-auth/react";

function getToken() {
  const token = localStorage.getItem("token");

  if (token) {
    return token;
  }
  return null;
}
const BASEURL = process.env.NEXTAUTH_URL || "https://lsp-theta.vercel.app/api";

const axiosInstance = axios.create({
  baseURL: BASEURL,
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  function (response) {
    console.log(response);

    return response;
  },
  function (error) {
    if (error.response.status === 401 || error.response.status == 403) {
      localStorage.clear();
      notifyError("Sesion Expired");
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("token");
      }
      signOut({ callbackUrl: "/auth/login" });
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
