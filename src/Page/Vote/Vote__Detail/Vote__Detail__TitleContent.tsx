import React from "react";
import styled from "styled-components";
import { useVoteDetailContext } from "./Vote__DetailProvider";

export default function VoteDetailTitleContent() {
    const { selectedVote } = useVoteDetailContext();

    return (
        <Container>
            <VoteTitle>{selectedVote.title}</VoteTitle>
            <br />
            <VoteContent>{selectedVote.content}</VoteContent>
            <br />
        </Container>
    );
}

const Container = styled.div`
    display: block;
    padding: 0px 6vw;
    margin-bottom: 35px;
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
