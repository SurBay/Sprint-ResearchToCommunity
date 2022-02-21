import axios from "axios";
import { API_ENDPOINT } from "../Constant";
import { handleAxiosError } from "../Axios/axios.error";

export function isValidEmail(emailInput: string) {
    const emailRegex =
        /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@([0-9a-zA-Z])*[.][a-zA-Z]{2,}([.][a-zA-Z]{2,})?/;
    return emailRegex.test(emailInput);
}

export async function isUniqueEmail(emailInput: string): Promise<boolean> {
    return await axios
        .get<boolean>(
            `${API_ENDPOINT}/api/temp-users/duplicate/${emailInput}`,
            { withCredentials: true }
        )
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            handleAxiosError(error, isUniqueEmail.name);
            return false;
        });
}
