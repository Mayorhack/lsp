import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";

import React, { FC, HTMLAttributes } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const modalVariant = cva(
  " max-w-lg bg-white rounded z-30  relative w-full max-h-[94vh] overflow-y-auto disable-scroll",
  {
    variants: {
      size: {
        xs: "max-w-xs p-3",
        sm: "max-w-sm p-3",
        md: "max-w-lg p-4 sm:p-8",
        lg: "max-w-xl p-4 sm:p-8",
        xl: "max-w-3xl p-4 sm:p-8",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
);
export interface ModalProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modalVariant> {
  closeModal: React.MouseEventHandler<HTMLDivElement> | undefined;
}
const Modal: FC<ModalProps> = ({ children, closeModal, size }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.5, type: "spring", ease: "easeOut" }}
      className={cn(modalVariant({ size }))}
    >
      <p
        className="absolute right-1 top-1 bg-[#E7E6E6] p-1 cursor-pointer hover:bg-red-400 hover:text-white rounded-full "
        onClick={closeModal}
      >
        <FiX size={"12px"} />
      </p>
      {children}
    </motion.div>
  );
};

export default Modal;
