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
};
export type ErrorResponse = {
  error?: unknown;
};
export type VehicleRequestType = {
  vehicleType: string;
  destination: string;
  purpose: string;
  officersCount: string;
  tripDuration: Date;
  initiatedBy: string;
  approvedBy: string;
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
