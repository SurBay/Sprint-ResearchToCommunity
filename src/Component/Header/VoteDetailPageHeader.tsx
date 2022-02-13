import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { DefaultHeaderContainer } from "../../Style";

export default function VoteDetailPageHeader() {
    const navigate = useNavigate();

    return (
        <Container>
            <BackArrowButton
                onClick={() => {
                    navigate(-1);
                }}
            >{`<`}</BackArrowButton>
            <span>voteboat</span>
            <MyPageButton>프로필</MyPageButton>
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

const BackArrowButton = styled.div`
    cursor: pointer;
`;

const MyPageButton = styled.div`
    cursor: pointer;
`;
