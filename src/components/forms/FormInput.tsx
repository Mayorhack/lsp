import React, { InputHTMLAttributes } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { FormInputProps } from "@/types";
const inputVariant = cva("rounded-md w-full py-3 px-2 text-inputText  ", {
  variants: {
    variant: {
      contained: "bg-[#f8f8f8]",
      outlined:
        " border-2 border-inputColor focus:outline-4  border-[#D0D5DD] focus:outline-none focus:border-[#32D583] focus:ring-1 focus:[#32D583]",
    },
  },
  defaultVariants: {
    variant: "outlined",
  },
});
export interface FormInputProp
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariant>,
    FormInputProps {
  uploaded?: boolean;
}
const FormInput: React.FC<FormInputProp> = ({
  label,
  // error,
  // errorMessage,
  variant,
  ...props
}) => {
  return (
    <div className=" w-full">
      {label ? (
        <label htmlFor={label} className={``}>
          {label}
        </label>
      ) : null}
      <input className={cn(inputVariant({ variant }))} {...props} id={label} />
    </div>
  );
};

export default FormInput;
