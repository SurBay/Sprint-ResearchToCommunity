import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { useVoteListContext } from "./VoteListProvider";
import { FullFlexPage } from "../../../Style";
import { Link } from "react-router-dom";

export default function VoteListContainer() {
    const [params] = useSearchParams();
    const { selectedVoteId, setSelectedVoteId } = useVoteListContext();

    useEffect(() => {
        const voteId = params.get("vote-id");
        if (voteId) {
            setSelectedVoteId(voteId);
        }
        return () => {};
    }, []);

    return (
        <Container>
            <VoteListHeader />
            <VoteListBody />
        </Container>
    );
}

function VoteListHeader() {
    return (
        <VoteListHeaderContainer>
            <div>투표 게시판</div>
            <div>햄버거 버튼</div>
        </VoteListHeaderContainer>
    );
}

function VoteListBody() {
    const { displayingVotes } = useVoteListContext();

    return (
        <VoteListBodyContainer>
            {displayingVotes.map((vote) => {
                return (
                    <VoteContainer key={vote._id}>
                        <Link to={`/vote`} state={vote}>
                            {vote.content}
                        </Link>
                    </VoteContainer>
                );
            })}
        </VoteListBodyContainer>
    );
}

const Container = styled.div`
    display: block;
    width: 100%;
    height: 100%;
`;

const VoteListHeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: ${(props) => props.theme.voteListHeaderHeight};
    padding: 0px 12px;
    border: 2px solid yellow;
`;

const VoteListBodyContainer = styled.div`
    display: block;
    width: 100%;
    height: 100%;
    overflow: auto;
`;

const VoteContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 450px;
    border: 2px solid red;
`;
