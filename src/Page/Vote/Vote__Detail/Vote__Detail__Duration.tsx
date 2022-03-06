import React from "react";
import styled from "styled-components";
import { useVoteDetailContext } from "./Vote__DetailProvider";
import { getDotFormDate, isDatePassed } from "../../../Util";
import { FlexSpaceBetweenDiv } from "../../../Style";

export default function VoteDetailDuration() {
    const { selectedVote } = useVoteDetailContext();

    return (
        <Container>
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
        </Container>
    );
}

const Container = styled(FlexSpaceBetweenDiv)`
    padding: 0px 6vw;
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

const VoteAllowDuplicateCheckText = styled.span`
    font-size: 2.8vw;
    color: ${(props) => props.theme.color.mainTheme};
`;
