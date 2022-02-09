import React from "react";
import styled from "styled-components";
import KakaotalkLoginImage from "../../Resource/Img/kakao_login_small.png";

export default function VoteDetail() {
    const REST_API_KEY = "b4ebbc6a9efc7432da5382b027d037e7";
    const REDIRECT_URI = "http://localhost:3000/kakao-oauth";

    return (
        <>
            투표 상세 페이지
            <a
                href={`https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`}
            >
                <img src={KakaotalkLoginImage} />
            </a>
            {/* <button onClick={() => {}}>카카오로 로그인하기</button> */}
        </>
    );
}

const KaKaoShareButton = styled.button`
    width: fit-content;
    height: fit-content;
    border: none;
    outline: none;
    color: inherit;
    background-color: inherit;
    &:hover {
        cursor: pointer;
    }
`;

const KaKaoButtonImg = styled.img`
    width: 80px;
    height: 80px;
`;
