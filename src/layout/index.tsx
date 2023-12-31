import { useRouter } from "next/router";
import { FC, HTMLAttributes } from "react";
import DashboardLayout from "./dashboardLayout";
interface LayoutProps extends HTMLAttributes<HTMLElement> {}

const Layout: FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  if (router.pathname === "/" || router.pathname.includes("auth"))
    return children;

  return <DashboardLayout>{children}</DashboardLayout>;
};

export default Layout;
