import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const successAlert = (messages: string) =>
  MySwal.fire({
    title: <strong>Successful</strong>,
    html: <i>{messages}</i>,
    icon: "success",
  });
export const errorAlert = (messages: string) =>
  MySwal.fire({
    title: <strong>Error</strong>,
    html: <i>{messages}</i>,
    icon: "error",
  });
