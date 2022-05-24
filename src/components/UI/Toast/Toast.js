import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Toast = (type = "info", message) => {
    toast(message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: type
    });
}