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
