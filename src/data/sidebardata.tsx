import { ReactNode } from "react";
import { FaCheckCircle, FaUser } from "react-icons/fa";
import { FaCarSide } from "react-icons/fa";
import { AiFillAppstore } from "react-icons/ai";

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
    logo: <AiFillAppstore className="text-2xl" size={24} />,
    role: ["Client"],
  },
  {
    id: 1,
    title: "Users",
    link: "/users",
    logo: <FaUser className="text-2xl" size={24} />,
    role: ["Client"],
  },

  {
    id: 1,
    title: "Vehicles",
    link: "/vehicles",
    logo: <FaCarSide className="text-xl" size={24} />,
    role: ["Client"],
  },

  {
    id: 1,
    title: "Approvals",
    link: "/approvals",
    logo: <FaCheckCircle className="text-xl" size={24} />,
    role: ["Client"],
  },
];
