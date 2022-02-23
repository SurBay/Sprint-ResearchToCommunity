import React from "react";
import styled from "styled-components";
import { useAppContext } from "../../../App/AppProvider";
import { useVoteDetailContext } from "./Vote__DetailProvider";
import VoteDetailSelect from "./Vote__Detail__Select";
import VoteDetailResult from "./Vote__Detail__Result";
import { getDotFormDate, isDatePassed } from "../../../Util";
import { FlexCenteringDiv, FlexSpaceBetweenDiv } from "../../../Style";

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
                    {isDatePassed(selectedVote.deadline) ? (
                        <VoteDoneTag>마감</VoteDoneTag>
                    ) : (
                        <VoteDurationTitle>참여기간</VoteDurationTitle>
                    )}
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
            {tempUserInfo.participatedVoteIds.includes(selectedVote._id) ||
            isDatePassed(selectedVote.deadline) ? (
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
    padding: 0px 6vw;
    margin-bottom: 25px;
`;

const VoteTitle = styled.span`
    font-size: 4.5vw;
    line-height: 7vw;
    color: ${(props) => props.theme.vote.voteDetailBodyTitleColor};
    padding-bottom: 12px;
`;

const VoteContent = styled.span`
    font-size: 3.7vw;
    line-height: 6vw;
    color: ${(props) => props.theme.vote.voteDetailBodyContentColor};
    padding-bottom: 12px;
`;

const VoteDurationTitleRow = styled(FlexSpaceBetweenDiv)`
    margin-top: 16px;
    margin-bottom: 30px;
`;

const VoteDurationTitleAndDate = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const VoteDoneTag = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 24px;
    font-size: 10px;
    color: gray;
    background-color: ${(props) => props.theme.voteDoneBackgroundColor};
    padding: 3px 8px;
    margin-right: 15px;
    border-radius: 12px;
`;

const VoteDurationTitle = styled.span`
    font-size: 3vw;
    padding-right: 10px;
    color: ${(props) => props.theme.vote.voteDetailBodyDurationTagColor};
`;

const VoteDurationDate = styled.span`
    font-size: 2.8vw;
    color: ${(props) => props.theme.vote.voteDetailBodyDurationColor};
`;

const VoteAllowDuplicateCheckText = styled.span``;
