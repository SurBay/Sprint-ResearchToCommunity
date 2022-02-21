import React from "react";
import styled from "styled-components";
import { useAppContext } from "../../../App/AppProvider";
import { useVoteDetailContext } from "./Vote__DetailProvider";
import VoteDetailSelect from "./Vote__Detail__Select";
import VoteDetailResult from "./Vote__Detail__Result";
import { getDotFormDate } from "../../../Util";
import { FlexSpaceBetweenDiv } from "../../../Style";

export default function VoteDetailBody() {
    const { tempUserInfo } = useAppContext();
    const { selectedVote } = useVoteDetailContext();

    return (
        <VoteDetailBodyContainer>
            <VoteTitle>{selectedVote.title}</VoteTitle>
            <br />
            <VoteContent>{selectedVote.content}</VoteContent>
            <br />
            <VoteDurationTitleRow>
                <VoteDurationTitleAndDate>
                    <VoteDurationTitle>참여기간</VoteDurationTitle>
                    <VoteDurationDate>{`${getDotFormDate(
                        selectedVote.date
                    )} ~ ${getDotFormDate(
                        selectedVote.deadline
                    )}`}</VoteDurationDate>
                </VoteDurationTitleAndDate>
                <VoteAllowDuplicateCheckText>
                    {selectedVote.multi_response && "복수응답"}
                </VoteAllowDuplicateCheckText>
            </VoteDurationTitleRow>
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
    color: ${(props) => props.theme.vote.voteDetailBodyTitleColor};
`;

const VoteContent = styled.span`
    font-size: 3.7vw;
    line-height: 6vw;
    color: ${(props) => props.theme.vote.voteDetailBodyContentColor};
`;

const VoteDurationTitleRow = styled(FlexSpaceBetweenDiv)``;

const VoteDurationTitleAndDate = styled.div``;

const VoteDurationTitle = styled.span`
    font-size: 3vw;
    line-height: 50px;
    padding-right: 10px;
    color: ${(props) => props.theme.vote.voteDetailBodyDurationColor};
`;

const VoteDurationDate = styled.span`
    font-size: 2.8vw;
`;

const VoteAllowDuplicateCheckText = styled.span``;
