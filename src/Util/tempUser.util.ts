import axios from "axios";
import { handleAxiosError } from "../Axios/axios.error";
import { API_ENDPOINT } from "../Constant";
import { LandingType } from "../App/AppProvider";
import { TempUserProp } from "../Type";

export async function signup(
    landingType: LandingType,
    email?: string,
    kakaoId?: string
): Promise<TempUserProp | null> {
    return await axios
        .post<TempUserProp | null>(`${API_ENDPOINT}/api/temp-users/signup`, {
            landingType,
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
