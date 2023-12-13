import { ReactNode } from "react";
import { FaUser } from "react-icons/fa";

type UserRole = "Client" | "Administrator" | "SystemAdministrator";

interface SidebarType {
  id: number;
  title: string;
  link: string;
  logo?: ReactNode;
  role: UserRole[];
  toggle?: boolean;
  children?: SidebarType[];
}

// client_side

export const sideBardata: SidebarType[] = [
  {
    id: 1,
    title: "Dashboard",
    link: "/dashboard",
    logo: <FaUser />,
    role: ["Client"],
  },
];
