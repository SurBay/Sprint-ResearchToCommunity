import React from "react";
import styled from "styled-components";
import { useVoteDetailContext } from "./Vote__DetailProvider";
import { getVoteParticipantsNumber } from "../../../Util";

export default function VoteDetailFooter() {
    const { selectedVote } = useVoteDetailContext();

    return (
        <VoteDetailFooterContainer>
            <VoteParticipatesDiv>{`체크 ${getVoteParticipantsNumber(
                selectedVote
            )}명 참여`}</VoteParticipatesDiv>
            <VoteLikesDiv>별표 12</VoteLikesDiv>
        </VoteDetailFooterContainer>
    );
}

const VoteDetailFooterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 15px;
    margin-bottom: 45px;
`;

const VoteParticipatesDiv = styled.div``;

const VoteLikesDiv = styled.div``;
