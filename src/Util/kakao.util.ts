import axios from "axios";
import { handleAxiosError } from "../Axios/axios.error";
import {
    AccessTokenResponse,
    KakaoAccount,
    KakaoUserInfo,
    TempUserProp,
    VoteProp,
} from "../Type";
import {
    KAKAO_JAVASCRIPT_KEY,
    KAKAO_REST_API_KEY,
    API_ENDPOINT,
    SERVICE_URL,
} from "../Constant";

// #!declare #!declare global
// 아래 구문은 index.tsx 에서 window Interface 를 global 하게 정의했기에 가능함
const { Kakao } = window;

// 카카오 API를 쓸 수 있도록 설정. 앱 실행시 바로 호출.
export function initializeKakaoSDK() {
    Kakao.init(KAKAO_JAVASCRIPT_KEY);
}

// button의 onClick 리스너에 포함 => sendDefault에 구성된 내용에 따라 카드형태의 공유 메세지 전송
export function sendKakaoFeedMessage(vote: VoteProp) {
    const sharingURL = `${SERVICE_URL}/redirect?vote-id=${vote._id}`;

    Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
            title: vote.title,
            description: vote.content,
            imageUrl:
                "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdeveloper.mozilla.org%2Fko%2Fdocs%2FWeb%2FHTML%2FElement%2Fimg&psig=AOvVaw3Lps6Q8gCSEI1POizNre7r&ust=1644889731694000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCKD0jvOJ_vUCFQAAAAAdAAAAABAD",
            link: {
                webUrl: sharingURL,
                mobileWebUrl: sharingURL,
            },
        },
        buttons: [
            {
                title: "나의 선택은?",
                link: {
                    webUrl: sharingURL,
                    mobileWebUrl: sharingURL,
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
        return await getKakaoUserInfoByAccessToken(access_token);
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
async function getKakaoUserInfoByAccessToken(
    access_token: string
): Promise<KakaoUserInfo | null> {
    return await axios
        .get<KakaoUserInfo>(`${API_ENDPOINT}/api/temp-users/kakao-account`, {
            headers: {
                access_token: access_token,
            },
        })
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            handleAxiosError(error, getKakaoUserInfoByAccessToken.name);
            return null;
        });
}

export async function getTempUserInfoByKakaoId(
    kakaoId: string
): Promise<TempUserProp | null> {
    return await axios
        .get<TempUserProp | null>(
            `${API_ENDPOINT}/api/temp-users?kakaoId=${kakaoId}`
        )
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            handleAxiosError(error, getTempUserInfoByKakaoId.name);
            return null;
        });
}

export async function signupWithKakaoUserInfo(
    kakaoUserInfo: KakaoUserInfo
): Promise<TempUserProp | null> {
    return await axios
        .post<TempUserProp | null>(
            `${API_ENDPOINT}/api/temp-users/signup-kakao`,
            {
                email: kakaoUserInfo.kakao_account?.email,
                kakaoId: kakaoUserInfo.id,
            }
        )
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            handleAxiosError(error, signupWithKakaoUserInfo.name);
            return null;
        });
}
