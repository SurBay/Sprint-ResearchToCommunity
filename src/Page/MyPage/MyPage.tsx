import React from "react";
import styled from "styled-components";
import { FullBlockHeaderPageDiv } from "../../Style";

export default function MyPage() {
    return (
        <Container>
            <ProfileContainer></ProfileContainer>
            <ParticipatedVotesContainer></ParticipatedVotesContainer>
        </Container>
    );
}

const Container = styled(FullBlockHeaderPageDiv)`
    padding: 0px 15px;
`;

const ProfileContainer = styled.div``;

const ParticipatedVotesContainer = styled.div``;
