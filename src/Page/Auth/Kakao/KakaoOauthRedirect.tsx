import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toastSuccessMessage } from "../../../Util";
import { useAppContext } from "../../../App/AppProvider";
import {
    getKakaoUserInfoFromCode,
    getTempUserInfoByKakaoId,
    signupWithKakaoUserInfo,
} from "../../../Util";
import { TempUserProp } from "../../../Type";

// 카카오 로그인 후 리다이렉트 되는 페이지
// TODO: url 통해 받은 code로 계정 정보 수신하고 나면 원래 보던 투표 페이지로 리다이렉트 시켜야 함
export function KakaoOatuhRedirect() {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const { landingType, setTempUserInfo, getCookie, setCookie } =
        useAppContext();

    useEffect(() => {
        const code = params.get("code");
        if (!code) {
            navigate("/", { replace: true });
            return;
        }
        handleKakaoLogin(code);
        const reservedVoteId = getCookie("reservedVoteId");
        if (reservedVoteId) {
            navigate(`/redirect?voteId=${reservedVoteId}`, { replace: true });
        } else {
            navigate(`/`, { replace: true });
        }
    }, []);

    async function handleKakaoLogin(code: string) {
        const kakaoUserInfo = await getKakaoUserInfoFromCode(code);
        if (!kakaoUserInfo) {
            return; // TODO: error message
        }

        const tempUserInfo = await getTempUserInfoByKakaoId(
            kakaoUserInfo.id.toString()
        );
        if (tempUserInfo) {
            saveUserInfo(tempUserInfo);
            setTempUserInfo(tempUserInfo);
            toastSuccessMessage("카카오 로그인이 완료되었습니다");
            return;
        }
        const newTempUserInfo = await signupWithKakaoUserInfo(
            landingType,
            kakaoUserInfo
        );
        if (newTempUserInfo) {
            saveUserInfo(newTempUserInfo);
            setTempUserInfo(newTempUserInfo);
            toastSuccessMessage("카카오 로그인이 완료되었습니다");
            return;
        }
        // TODO: error message
        return;
    }

    function saveUserInfo(userInfo: TempUserProp) {
        setCookie("email", userInfo.email);
        setCookie("kakaoId", userInfo.kakaoId);
        setCookie("jwt", userInfo.jwt);
    }

    return (
        <>
            <div>카카오 로그인이 완료되었습니다</div>
        </>
    );
}
