import toast from "react-hot-toast";

export function makeLoginSuccessToast(message: string) {
    return toast.success(message, {
        duration: 3000,
        position: "bottom-center",
    });
}
