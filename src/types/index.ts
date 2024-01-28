import React from "react";

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
export interface SelectOptionProp {
  name: string;
  code: string;
}
export interface CustomButtonProps {
  loading?: boolean;
}
export type ResponseService<T> = {
  code: "00" | "01";
  message?: string;
  data?: T;
  error?: unknown;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  totalPages?: number;
};
export type ErrorResponse = {
  error?: unknown;
};
export interface TableFilters {
  pageIndex: number;
  pageSize: number;
}
export type VehicleRequestType = {
  emailAddress: string;
  vehicleType: string;
  destination: string;
  purpose: string;
  officersCount: string;
  tripDuration: Date | null;
  initiatedBy: string;
  approvedBy?: string;
  status: string;
};
export type UserType = {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  email: string;
};
export type ApprovalPayload = {
  status: "Y" | "N";
  approvedBy: string;
  requestId: Number;
};
export interface UserDetails {
  username?: string;
  roleCategory: null | string;
  userRole: null | string;
  phoneNumber: string;
  firstname: string;
  lastname: string;
  active: boolean;
  status: string;
  isUserActive: boolean;
  activatedOn: null | string;
  email: string;
  lastLogin: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  city: string;
}
export interface RequestDetails {
  vehicleType: string;
  destination: string;
  purpose: string;
  officersCount: string;
  tripDuration: string;
  initiatedBy: string;
  approvedBy: string;
  status: "Pending" | "Approved" | "Rejected";
  createdAt: string;
  updatedAt: string;
  requestId: number;
}
export interface UserFilters {
  username?: string | string[];
}
export interface RequestFilters {
  username?: string | string[];
}
