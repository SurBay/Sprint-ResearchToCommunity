import React from "react";
import styled from "styled-components";
import { SvgIcon, DefaultHeaderContainer } from "../../Style";
import HamburgerMenuIcon from "../../Resource/svg/hamburger-menu-icon.svg";

export default function VoteListPageHeader() {
    return (
        <Container>
            <div>투표게시판</div>
            <SvgIcon src={HamburgerMenuIcon} width={"24px"} />
        </Container>
    );
}

const Container = styled(DefaultHeaderContainer)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
