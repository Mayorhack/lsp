import { cva, type VariantProps } from "class-variance-authority";

import { ButtonHTMLAttributes, FC } from "react";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CustomButtonProps } from "@/types";

const buttonVariants = cva(
  "rounded-lg font-inter   w-full  text-sm flex gap-2 items-center justify-center transition-colors outline-highlight disabled:opacity-50",
  {
    variants: {
      variant: {
        contained: "hover:bg-highlight2 bg-highlight text-white",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outlined: "border-highlight border-2 text-highlight hover:bg-gray-300",
        dark: "sm:bg-[#979797] hover:bg-gray-500 sm:text-white border-2 border-black sm:border-none ",
      },
      size: {
        default: "p-3 h-12",
        sm: "p-2 h-8",
        normal: "sm:max-w-[180px] p-3 h-12",
        xs: "max-w-[80px] p-1",
        // lg: "h-11 rounded-md px-8",
        // icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "contained",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants>,
    CustomButtonProps {}

const Button: FC<ButtonProps> = ({
  className,
  variant,
  size,
  children,
  loading,
  disabled,
  ...props
}) => (
  <motion.div whileTap={{ y: 5 }} className="w-full outline-none">
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? <span className="loader"></span> : children}
    </button>
  </motion.div>
);
export default Button;
