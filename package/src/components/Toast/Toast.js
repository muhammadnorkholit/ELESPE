import { toast } from "react-toastify";

const Toast = ({
  message,
  type,
  position = toast.POSITION.TOP_RIGHT,
  autoClose = 3000,
  hideProgressBar = false,
  closeOnClick = true,
  pauseOnHover = true,
  draggable = true,
  progress = undefined,
}) => {
  let config = {
    position,
    autoClose,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
    progress,
  };
  switch (type) {
    case "success":
      toast.success(message, {
        config,
      });
      break;
    case "error":
      toast.error(message, {
        config,
      });
      break;
    case "warning":
      toast.warning(message, {
        config,
      });
      break;
    case "info":
      toast.info(message, {
        config,
      });
      break;
    default:
      toast(message, {
        config,
      });
      break;
  }

  return null;
};

export default Toast;
