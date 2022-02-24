import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useVoteDetailContext } from "../../Page/Vote/Vote__Detail/Vote__DetailProvider";
import { StylelessLink, SvgIcon, DefaultHeaderContainer } from "../../Style";
import ProfileIcon from "../../Resource/svg/profile-icon.svg";

export default function VoteDetailPageHeader() {
    const navigate = useNavigate();
    const { selectedVote } = useVoteDetailContext();

    return (
        <Container>
            <BackArrowButton
                onClick={() => {
                    navigate("/", { state: { sawVoteId: selectedVote._id } });
                }}
            >{`<`}</BackArrowButton>
            <StylelessLink to={"/"}>SurBay</StylelessLink>
            <StylelessLink to={"/profile"}>
                <SvgIcon src={ProfileIcon} width={"24px"} />
            </StylelessLink>
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
