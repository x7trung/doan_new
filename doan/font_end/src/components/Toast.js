import { toast } from "react-toastify";

const Toast = (type, message) => {
    return toast[type](message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    });
}
export default Toast