import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const notifyError = (message: string) => {
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    hideProgressBar: true,
    theme: "colored",
  });
};
export const notifySuccess = (message: string) => {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    hideProgressBar: true,
    theme: "colored",
  });
};
export const notifyInfo = (message: string) => {
  toast.info(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 500,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    hideProgressBar: true,
    theme: "colored",
  });
};
