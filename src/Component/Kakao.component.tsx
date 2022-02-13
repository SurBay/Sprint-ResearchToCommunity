import React from "react";
import styled from "styled-components";
import { ChildrenProp } from "../Type";
import { KAKAO_OAUTH_REQUST_URL } from "../Constant";

export function KakaoOauthRedirectWrapper({ children }: ChildrenProp) {
    return (
        <KakaoOauthWrapper href={KAKAO_OAUTH_REQUST_URL}>
            {children}
        </KakaoOauthWrapper>
    );
}

const KakaoOauthWrapper = styled.a`
    text-decoration: none;
`;
