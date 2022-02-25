import React from "react";
import styled from "styled-components";
import {
    ClickableSvgIcon,
    StylelessLink,
    DefaultHeaderContainer,
} from "../../Style";
import HamburgerMenuIcon from "../../Resource/svg/hamburger-menu-icon.svg";

export default function VoteListPageHeader() {
    return (
        <Container>
            <div>투표게시판</div>
            <StylelessLink to={"/profile"}>
                <ClickableSvgIcon src={HamburgerMenuIcon} width={"24px"} />
            </StylelessLink>
        </Container>
    );
}

const Container = styled(DefaultHeaderContainer)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
