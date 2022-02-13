import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../../../App/AppProvider";
import { getKakaoUserInfoFromCode } from "../../../Util/kakao.util";

// 카카오 로그인 후 리다이렉트 되는 페이지
// TODO: url 통해 받은 code로 계정 정보 수신하고 나면 원래 보던 투표 페이지로 리다이렉트 시켜야 함
export function KakaoOatuhRedirect() {
    const [params] = useSearchParams();
    const [userEmail, setUserEmail] = useState<string>("");

    useEffect(() => {
        const code = params.get("code");

        if (code) {
            setEmailFromKakakoAccount(code);
        } else {
            console.log("URL 인자를 읽을 수 없습니다 :");
        }

        return;
    }, []);

    async function setEmailFromKakakoAccount(code: string) {
        const kakaoUserInfo = await getKakaoUserInfoFromCode(code);
        if (kakaoUserInfo && kakaoUserInfo.kakao_account.email) {
            setUserEmail(kakaoUserInfo.kakao_account.email);
        }
    }

    return (
        <>
            <div>카카오 로그인이 완료되었습니다</div>
            {userEmail && <div>{`${userEmail}님, 환영합니다`}</div>}
        </>
    );
}
