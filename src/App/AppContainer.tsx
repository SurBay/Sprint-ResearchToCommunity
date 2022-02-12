import React from "react";
import styled from "styled-components";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useAppContext } from "./AppProvider";
import Header from "../Component/Header";
import Modal from "../Component/Modal";
import { InvalidAddressAlert, NonMobileConnectionAlert } from "../Page/Alert";
import VoteList from "../Page/Vote/Vote_List";
import VoteDetail from "../Page/Vote/Vote__Detail";
import { KakaoOatuhRedirect } from "../Page/Auth";
import { LandingPageRedirector } from "../Page/Redirector";
import { FullFlexDiv, FullBlockDiv } from "../Style";

export default function AppContainer() {
    const { connectOnMobile } = useAppContext();

    if (!connectOnMobile) return <NonMobileConnectionAlert />;

    return (
        <BrowserRouter>
            <MainRouter />
            <ModalRotuer />
        </BrowserRouter>
    );
}

function MainRouter() {
    const location = useLocation();

    return (
        <Container>
            <Header />
            <Routes>
                <Route path="/" element={<VoteList />} />
                <Route path="/vote" element={<VoteDetail />} />
                <Route path="/kakao-oauth" element={<KakaoOatuhRedirect />} />
                <Route path="/redirect" element={<LandingPageRedirector />} />
                <Route path="/*" element={<InvalidAddressAlert />} />
            </Routes>
        </Container>
    );
}

function ModalRotuer() {
    const { modalType, setModalType } = useAppContext();

    if (!modalType) return null;

    return (
        <ModalOuterContainer>
            <ModalInnerContainer>
                <ModalBackground
                    className={"ModalBackground"}
                    onClick={() => {
                        setModalType(null);
                    }}
                />
                <Modal />
            </ModalInnerContainer>
        </ModalOuterContainer>
    );
}

const Container = styled(FullBlockDiv)``;

const ModalOuterContainer = styled(FullFlexDiv)`
    position: absolute;
    top: 0px;
`;

const ModalInnerContainer = styled(FullFlexDiv)`
    position: relative;
    justify-content: center;
    align-items: center;
`;

const ModalBackground = styled(FullFlexDiv)`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.5;
`;
