import { useEffect } from "react";
import { FC } from "react";
import Modal, { ModalProps } from "./Modal";
import { AnimatePresence, motion } from "framer-motion";
interface OverlayProps extends ModalProps {
  openState: boolean;
}
const Overlay: FC<OverlayProps> = ({
  closeModal,
  children,
  openState,
  size,
}) => {
  useEffect(() => {
    const body = document.querySelector("body");
    openState ? body?.classList.add("disable") : null;
    return () => body?.classList.remove("disable");
  }, [openState]);
  return (
    <AnimatePresence mode="wait">
      {openState ? (
        <motion.div
          key={"modal"}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, type: "spring", ease: "easeOut" }}
          className={`min-w-screen min-h-screen w-screen h-screen fixed overflow-hidden inset-0 grid place-items-center z-10 p-1 ${
            children ? "z-40" : ""
          }`}
        >
          <div
            className={`min-w-screen min-h-screen w-full h-full bg-[#1a1a1a] opacity-50  absolute overflow-hidden inset-0`}
            onClick={closeModal}
          ></div>
          {children ? (
            <Modal closeModal={closeModal} size={size}>
              {children}
            </Modal>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Overlay;
