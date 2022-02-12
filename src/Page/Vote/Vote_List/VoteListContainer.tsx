import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useSearchParams } from "react-router-dom";
import { useVoteListContext } from "./VoteListProvider";
import {
    FullBlockHeaderPageDiv,
    FullFlexHeaderPageDiv,
    FullFlexDiv,
    FullBlockDiv,
} from "../../../Style";

export default function VoteListContainer() {
    const [params] = useSearchParams();

    return (
        <Container>
            <VoteListBody />
        </Container>
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

const Container = styled(FullFlexHeaderPageDiv)`
    /* overflow: hidden; */
    border: 2px solid black;
`;

const VoteListBodyContainer = styled(FullBlockDiv)`
    overflow-y: auto;
    // IE, Edge
    -ms-overflow-style: none;
    // Firefox
    scrollbar-width: none;
    // Chrome, Safari, Opera
    -webkit-scrollbar {
        display: none;
    }
`;

const VoteContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
    border: 2px solid red;
`;
