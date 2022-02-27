import React from "react";
import styled from "styled-components";
import { useVoteDetailContext } from "./Vote__DetailProvider";
import VoteDetailPageHeader from "../../../Component/Header/VoteDetailPageHeader";
import VoteDetailVoteHeader from "./Vote__Detail__VoteHeader";
import VoteDetailHeader from "./Vote__Detail__Header";
import VoteDetailBody from "./Vote__Detail__Body";
import VoteDetailFooter from "./Vote__Detail__Footer";
import VoteDetailComment from "./Vote__Detail__Comment";
import VoteDetailOthers from "./Vote__Detail__Others";
import InteractionComment from "../../../Component/Interaction.component";
import ModalWrapper from "../../../Modal/ModalWrapper";
import RequestSignupModal from "../../../Modal/RequestSignupModal";
import { FullBlockHeaderPageDiv } from "../../../Style";

export default function VoteDetailContainer() {
    const { modalOpened, closeModal } = useVoteDetailContext();
    return (
        <>
            <VoteDetailPageHeader />
            <Container>
                <VoteDetailVoteHeader />
                <VoteDetailHeader />
                <VoteDetailBody />
                <VoteDetailFooter />
                <VoteDetailComment />
                <VoteDetailOthers />
            </Container>
            <InteractionComment />
            {modalOpened && (
                <ModalWrapper modalClosure={closeModal}>
                    <RequestSignupModal />
                </ModalWrapper>
            )}
        </>
    );
}

const Container = styled(FullBlockHeaderPageDiv)``;
