import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { DefaultHeaderContainer } from "../../Style";

export default function ProfilePageHeader() {
    const navigate = useNavigate();
    return (
        <Container>
            <BackArrowButton
                onClick={() => {
                    navigate(-1);
                }}
            >
                {"<"}
            </BackArrowButton>
            내 정보
        </Container>
    );
}

const Container = styled(DefaultHeaderContainer)`
    display: flex;
    align-items: center;
    gap: 20px;
`;

const BackArrowButton = styled.div`
    font-size: 8vw;
    cursor: pointer;
`;
