import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getKakaoUserInfoFromCode } from "../../Util/kakao.util";

export function KakaoOatuhRedirect() {
    const [params] = useSearchParams();
    const [userEmail, setUserEmail] = useState<string>("");

    useEffect(() => {
        const code = params.get("code");

        if (code) {
            setEmailFromKakakoAccount(code);
        } else {
            console.log("URL 인자를 읽을 수 없습니다 :");
            console.dir(params);
        }

        return;
    }, []);

    async function setEmailFromKakakoAccount(code: string) {
        const kakao_account = await getKakaoUserInfoFromCode(code);
        if (kakao_account && kakao_account.email) {
            setUserEmail(kakao_account.email);
        }
    }

    return (
        <>
            <div>카카오 로그인이 완료되었습니다</div>
            {userEmail && <div>{`${userEmail}님, 환영합니다`}</div>}
        </>
    );
}
