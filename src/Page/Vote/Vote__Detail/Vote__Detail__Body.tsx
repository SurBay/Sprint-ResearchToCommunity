import React from "react";
import styled from "styled-components";
import { useAppContext } from "../../../App/AppProvider";
import { useVoteDetailContext } from "./Vote__DetailProvider";
import VoteDetailSelect from "./Vote__Detail__Select";
import VoteDetailResult from "./Vote__Detail__Result";

export default function VoteDetailBody() {
    const { tempUserInfo } = useAppContext();
    const { selectedVote } = useVoteDetailContext();

    return (
        <VoteDetailBodyContainer>
            <VoteTitle>{selectedVote.title}</VoteTitle>
            <br />
            <VoteContent>{selectedVote.content}</VoteContent>
            <br />
            <VoteDurationTitle>참여기간</VoteDurationTitle>
            <VoteDurationDate>2022.02.06 ~ 2022.02.13</VoteDurationDate>
            {tempUserInfo.participatedVoteIds.includes(selectedVote._id) ? (
                <VoteDetailResult />
            ) : (
                <VoteDetailSelect />
            )}
        </VoteDetailBodyContainer>
    );
}

// Body 부분
const VoteDetailBodyContainer = styled.div`
    display: block;
    padding: 0px 12px;
    margin-bottom: 25px;
`;

const VoteTitle = styled.span`
    font-size: 4.5vw;
    line-height: 7vw;
`;

const VoteContent = styled.span`
    font-size: 3.7vw;
    line-height: 6vw;
`;

const VoteDurationTitle = styled.span`
    font-size: 3vw;
    line-height: 50px;
`;

const VoteDurationDate = styled.span`
    font-size: 2.8vw;
`;

const VoteAllowDuplicateCheckText = styled.span``;
