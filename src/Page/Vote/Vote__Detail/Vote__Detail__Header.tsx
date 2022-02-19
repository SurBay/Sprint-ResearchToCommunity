import React from "react";
import styled from "styled-components";
import { useVoteDetailContext } from "./Vote__DetailProvider";
import { FlexSpaceBetweenDiv, FlexCenteringDiv } from "../../../Style";

export default function VoteDetailHeader() {
    const { selectedVote } = useVoteDetailContext();

    return (
        <VoteDetailHeaderContainer>
            <VoteAuthorProfileContainer>
                <div>작성자 사진</div>
                <span>{selectedVote.author}</span>
            </VoteAuthorProfileContainer>
            <div>공유하기</div>
        </VoteDetailHeaderContainer>
    );
}

// Header 부분
const VoteDetailHeaderContainer = styled(FlexSpaceBetweenDiv)`
    height: 60px;
    padding: 0px 12px;
    margin-bottom: 40px;
`;

const VoteAuthorProfileContainer = styled(FlexCenteringDiv)``;
