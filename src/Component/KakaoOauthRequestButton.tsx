import React from "react";
import { KAKAO_OAUTH_REQUST_URL } from "../Constant";
import KakaotalkLoginImage from "../Resource/Img/kakao_login_small.png";

export default function KakaoOauthRequestButton() {
    return (
        <a href={KAKAO_OAUTH_REQUST_URL}>
            <img src={KakaotalkLoginImage} />
        </a>
    );
}
