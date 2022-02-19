import axios from "axios";
import { handleAxiosError } from "../Axios/axios.error";
import { API_ENDPOINT } from "../Constant";
import { TempUserProp } from "../Type";

export async function signup(
    email?: string,
    kakaoId?: string
): Promise<TempUserProp | null> {
    return await axios
        .post<TempUserProp | null>(`${API_ENDPOINT}/api/temp-users/signup`, {
            email,
            kakaoId,
        })
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            handleAxiosError(error, signup.name);
            return null;
        });
}
