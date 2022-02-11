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

    return (
        <BrowserRouter>
            <OutestContainer>
                <Container>
                    <Header />
                    <MainRouter />
                </Container>
                {/* <Modal /> */}
            </OutestContainer>
        </BrowserRouter>
        // <>
        //     {connectOnMobile ? (
        //         <BrowserRouter>
        //             <OutestContainer>
        //                 <Container>
        //                     <Header />
        //                     <MainRouter />
        //                 </Container>
        //                 <Modal />
        //             </OutestContainer>
        //         </BrowserRouter>
        //     ) : (
        //         <NonMobileConnectionAlert />
        //     )}
        // </>
    );
}

function MainRouter() {
    const location = useLocation();

    return (
        <>
            <Routes>
                <Route path="/" element={<VoteList />} />
                <Route path="/vote" element={<VoteDetail />} />
                <Route path="/kakao-oauth" element={<KakaoOatuhRedirect />} />
                <Route path="/redirect" element={<LandingPageRedirector />} />
                <Route path="/*" element={<InvalidAddressAlert />} />
            </Routes>
        </>
    );
}

const OutestContainer = styled(FullFlexDiv)`
    position: relative;
`;

const Container = styled(FullBlockDiv)``;
