import axios from "axios";
import { handleAxiosError } from "../Axios/axios.error";
import { AccessTokenResponse, KakaoAccount, KakaoUserInfo } from "../Type";
import { API_ENDPOINT, SERVICE_URL } from "../Constant";
import {
    KAKAO_JAVASCRIPT_KEY,
    KAKAO_REST_API_KEY,
} from "../Constant/kakao.constant";

// #!declare #!declare global
// 아래 구문은 index.tsx 에서 window Interface 를 global 하게 정의했기에 가능함
const { Kakao } = window;

// 카카오 API를 쓸 수 있도록 설정. 앱 실행시 바로 호출.
export function initializeKakaoSDK() {
    Kakao.init(KAKAO_JAVASCRIPT_KEY);
}

// button의 onClick 리스너에 포함 => sendDefault에 구성된 내용에 따라 카드형태의 공유 메세지 전송
export function sendKakaoFeedMessage() {
    const sharedURL = location.href;

    Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
            title: "선글라스 무한 증식시키기",
            description: "넋 놓고 보게 되는 선글라스 짤을 무한으로 즐기세요",
            imageUrl:
                "https://theawesomedaily.com/wp-content/uploads/2020/04/puts-on-sunglasses-feat-1-1.jpg",
            link: {
                webUrl: sharedURL,
                mobileWebUrl: sharedURL,
            },
        },
        buttons: [
            {
                title: "나도 증식시키기",
                link: {
                    webUrl: sharedURL,
                    mobileWebUrl: sharedURL,
                },
            },
        ],
    });
}

// getKakaoAccessToken()과 getKakaoAccountInfo()를 순차적으로 실행
// 결과적으로 code를 카카오 사용자 정보와 교환함
export async function getKakaoUserInfoFromCode(
    code: string
): Promise<KakaoUserInfo | null> {
    const access_token = await getKakaoAccessToken(code);
    if (access_token) {
        return await getKakaoAccountInfo(access_token);
    }
    return null;
}

// kakao-oauth 로 리다이렉트 되면서 받아온 코드를 사용하여 Access Token 을 발급
async function getKakaoAccessToken(code: string) {
    let access_token: string | null = null;

    const params = {
        grant_type: "authorization_code",
        client_id: KAKAO_REST_API_KEY,
        redirect_uri: `${SERVICE_URL}/kakao-oauth`,
        code: code,
    };

    const queryString = Object.keys(params)
        .map(
            (param) =>
                encodeURIComponent(param) +
                "=" +
                encodeURIComponent(params[param as keyof typeof params])
        )
        .join("&");

    await axios
        .post<AccessTokenResponse>(
            `https://kauth.kakao.com/oauth/token`,
            queryString,
            {
                headers: {
                    "Content-type":
                        "application/x-www-form-urlencoded;charset=utf-8",
                },
            }
        )
        .then((response) => {
            access_token = response.data.access_token;
        })
        .catch((error) => {
            handleAxiosError(error, getKakaoAccessToken.name);
        });
    return access_token;
}

// Access Token 을 이용하여 카카오 계정 정보를 얻어옴.
// 이 부분은 브라우저를 이용한 스크립트 실행이 막혀있으므로 backend를 이용해야 함.
async function getKakaoAccountInfo(
    access_token: string
): Promise<KakaoUserInfo | null> {
    return await axios
        .get<KakaoUserInfo>(`${API_ENDPOINT}/api/temp-user/kakao-account`, {
            headers: {
                access_token: access_token,
            },
        })
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            handleAxiosError(error, getKakaoAccountInfo.name);
            return null;
        });
}
