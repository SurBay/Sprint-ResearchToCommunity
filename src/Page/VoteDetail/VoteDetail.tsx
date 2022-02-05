import React from "react";
import styled from "styled-components";

export default function VoteDetail() {
    return <>투표 상세 페이지</>;
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
