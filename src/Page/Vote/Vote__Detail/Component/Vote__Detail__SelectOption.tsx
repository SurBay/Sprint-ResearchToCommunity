import React from "react";
import styled from "styled-components";
import { PollProp } from "../../../../Type";
import { FlexSpaceBetweenDiv } from "../../../../Style";

export default function VoteDetailSelectOption({ poll }: { poll: PollProp }) {
    return (
        <Container>
            <VoteOptionTitle>{poll.content}</VoteOptionTitle>
            <VoteOptionSelected>(대충 체크 표시)</VoteOptionSelected>
        </Container>
    );
}

const Container = styled(FlexSpaceBetweenDiv)`
    width: 94%;
    height: 50px;
    border: 1px solid gray;
    border-radius: 25px;
    padding: 0px 15px;
    margin: 10px auto;
    cursor: pointer;
`;

const VoteOptionTitle = styled.span``;

const VoteOptionSelected = styled.div``;
