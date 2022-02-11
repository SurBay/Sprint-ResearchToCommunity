import React from "react";
import styled from "styled-components";
import { DefaultHeaderContainer } from "../../Style";

export default function VoteDetailPageHeader() {
    return (
        <Container>
            <div>{`<`}</div>
            <div>voteboat</div>
            <div>프로필</div>
        </Container>
    );
}

const Container = styled(DefaultHeaderContainer)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    background-color: ${(props) => props.theme.headerColor};
`;
