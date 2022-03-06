import React from "react";
import styled from "styled-components";
import { useAppContext } from "../../../App/AppProvider";
import { useVoteDetailContext } from "./Vote__DetailProvider";
import VoteDetailPageHeader from "../../../Component/Header/VoteDetailPageHeader";
import VoteDetailVoteHeader from "./Vote__Detail__VoteHeader";
import VoteDetailHeader from "./Vote__Detail__Header";
import VoteDetailTitleContent from "./Vote__Detail__TitleContent";
import VoteDetailDuration from "./Vote__Detail__Duration";
import VoteDetailPhoto from "./Vote__Detail__Photo";
import VoteDetailSelect from "./Vote__Detail__Select";
import VoteDetailResult from "./Vote__Detail__Result";
import VoteDetailFooter from "./Vote__Detail__Footer";
import VoteDetailComment from "./Vote__Detail__Comment";
import VoteDetailOthers from "./Vote__Detail__Others";
import ModalWrapper from "../../../Modal/ModalWrapper";
import RequestSignupModal from "../../../Modal/RequestSignupModal";
import { isDatePassed } from "../../../Util";
import { FullBlockHeaderPageDiv } from "../../../Style";

export default function VoteDetailContainer() {
    const { tempUserInfo } = useAppContext();
    const { selectedVote, modalOpened, closeModal } = useVoteDetailContext();

    return (
        <>
            <VoteDetailPageHeader />
            <Container>
                <VoteDetailVoteHeader />
                <VoteDetailHeader />
                <VoteDetailTitleContent />
                <VoteDetailPhoto />
                <VoteDetailDuration />
                {tempUserInfo.participatedVoteIds.includes(selectedVote._id) ||
                isDatePassed(selectedVote.deadline) ? (
                    <VoteDetailResult />
                ) : (
                    <VoteDetailSelect />
                )}
                <VoteDetailFooter />
                <VoteDetailComment />
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
