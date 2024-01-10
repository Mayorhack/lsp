import { ReactNode } from "react";
import { FaUser } from "react-icons/fa";
import { FaCarSide } from "react-icons/fa";
import { BsPersonFillCheck } from "react-icons/bs";

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
    title: "Users",
    link: "/dashboard",
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
    logo: <BsPersonFillCheck className="text-xl" size={24} />,
    role: ["Client"],
  },
];
