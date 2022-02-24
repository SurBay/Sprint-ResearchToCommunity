import toast from "react-hot-toast";

export function toastSuccessMessage(message: string) {
    return toast.success(message, {
        duration: 3000,
        position: "bottom-center",
    });
}
