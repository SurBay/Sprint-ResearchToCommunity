import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { StylelessLink, SvgIcon, DefaultHeaderContainer } from "../../Style";
import ProfileIcon from "../../Resource/svg/profile-icon.svg";

export default function VoteDetailPageHeader() {
    const navigate = useNavigate();

    return (
        <Container>
            <BackArrowButton
                onClick={() => {
                    navigate(-1);
                }}
            >{`<`}</BackArrowButton>
            <StylelessLink to={"/"}>voteboat</StylelessLink>
            <SvgIcon src={ProfileIcon} width={"24px"} />
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
