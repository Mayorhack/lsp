import Button from "@/components/Button";
import ScreenLoader from "@/components/ScreenLoader";
import { notifyError } from "@/utils/notifier";
import { signIn } from "next-auth/react";
import Logo from "@/images/logo.svg";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Image from "next/image";

const Login = () => {
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();
  const [loginDetail, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await signIn("credentials", {
      username: loginDetail.username,
      password: loginDetail.password,
      redirect: false,
    });

    if (result?.status === 401) {
      notifyError("Password or Username Incorrect");
      setIsLoading(false);
      return;
    } else {
      router.push("/dashboard");
      setIsLoading(false);
    }
  };
  return (
    <div className="w-screen h-screen place-items-center grid bg-[#f3f3f3]">
      <Image
        src={Logo}
        alt="Logo"
        className="absolute top-5 left-1/2 -translate-x-1/2"
      />
      <div className="bg-white max-w-lg text-center w-full p-8 space-y-4 rounded-md shadow-xl">
        <h3 className="text-lg text-highlight">Welcome Back</h3>
        <h2 className="text-2xl font-bold font-poppins text-highlight2">
          Log into your account
        </h2>
        <form action="" onSubmit={onSubmit} className="space-y-4">
          <div className="flex flex-col items-start">
            <label htmlFor="">Email or Username</label>
            <input
              name="username"
              type="text"
              className="border border-feint w-full rounded-md p-2"
              placeholder="Enter username"
              value={loginDetail.username}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col items-start">
            <label htmlFor="">Password</label>
            <input
              name="password"
              type="password"
              className="border border-feint w-full rounded-md p-2"
              placeholder="Enter password"
              value={loginDetail.password}
              onChange={handleChange}
            />
          </div>
          <Button className={"w-full py-2"}>Submit</Button>
        </form>
      </div>
      {loading ? <ScreenLoader /> : null}
    </div>
  );
};

export default Login;
