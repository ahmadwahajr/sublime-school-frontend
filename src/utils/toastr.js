import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

// toast.configure();

export const _alert = toast;
export const error = (msg, autoClose) => {
  toast(msg, { type: "error", autoClose: 2000, pauseOnFocusLoss: false });
};
export const info = (msg, autoClose) =>
  toast(msg, { type: "info", autoClose: 2000, pauseOnFocusLoss: false });
export const success = (msg, autoClose) =>
  toast(msg, { type: "success", autoClose: 2000, pauseOnFocusLoss: false });
