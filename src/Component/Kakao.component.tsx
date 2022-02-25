import React from "react";
import styled from "styled-components";
import ReactGA from "react-ga";
import { ChildrenProp } from "../Type";
import { KAKAO_OAUTH_REQUEST_URL } from "../Constant";

export function KakaoOauthRedirectWrapper({ children }: ChildrenProp) {
    return (
        <KakaoOauthWrapper
            href={KAKAO_OAUTH_REQUEST_URL}
            onClick={() => {
                ReactGA.event({
                    category: "Signup",
                    action: "Signup with Kakao",
                });
            }}
        >
            {children}
        </KakaoOauthWrapper>
    );
}

const KakaoOauthWrapper = styled.a`
    text-decoration: none;
`;
