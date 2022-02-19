import React from "react";
import styled from "styled-components";
import { useVoteDetailContext } from "./Vote__DetailProvider";
import VoteDetailPageHeader from "../../../Component/Header/VoteDetailPageHeader";
import VoteDetailHeader from "./Vote__Detail__Header";
import VoteDetailBody from "./Vote__Detail__Body";
import VoteDetailFooter from "./Vote__Detail__Footer";
import VoteDetailOthers from "./Vote__Detail__Others";
import ModalWrapper from "../../../Modal/ModalWrapper";
import RequestSignupModal from "../../../Modal/RequestSignupModal";
import { FullBlockHeaderPageDiv } from "../../../Style";

export default function VoteDetailContainer() {
    const { modalOpened, closeModal } = useVoteDetailContext();
    return (
        <>
            <VoteDetailPageHeader />
            <Container>
                <VoteDetailHeader />
                <VoteDetailBody />
                <VoteDetailFooter />
                <VoteDetailOthers />
            </Container>
            {modalOpened && (
                <ModalWrapper modalClosure={closeModal}>
                    <RequestSignupModal />
                </ModalWrapper>
            )}
        </>
    );
}

const Container = styled(FullBlockHeaderPageDiv)``;
