import React from "react";
import styled from "styled-components";
import { DefaultHeaderContainer } from "../../Style";

export default function VoteListPageHeader() {
    return (
        <Container>
            <div>투표게시판</div>
            <div>햄버거</div>
        </Container>
    );
}

const Container = styled(DefaultHeaderContainer)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
