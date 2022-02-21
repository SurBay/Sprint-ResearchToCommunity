import React from "react";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppContext } from "./AppProvider";
import { InvalidAddressAlert, NonMobileConnectionAlert } from "../Page/Alert";
import VoteList from "../Page/Vote/Vote__List";
import VoteDetail from "../Page/Vote/Vote__Detail";
import Profile from "../Page/Profile";
import { KakaoOatuhRedirect } from "../Page/Auth";
import { LandingPageRedirector } from "../Page/Redirector";
import { FullBlockDiv } from "../Style";
import { Toaster } from "react-hot-toast";

export default function AppContainer() {
    const { connectOnMobile } = useAppContext();

    if (!connectOnMobile) return <NonMobileConnectionAlert />;

    return (
        <BrowserRouter>
            <MainRouter />
            <Toaster />
        </BrowserRouter>
    );
}

function MainRouter() {
    return (
        <Container>
            <Routes>
                <Route path="/" element={<VoteList />} />
                <Route path="/vote/:voteId" element={<VoteDetail />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/kakao-oauth" element={<KakaoOatuhRedirect />} />
                <Route path="/redirect" element={<LandingPageRedirector />} />
                <Route path="/*" element={<InvalidAddressAlert />} />
            </Routes>
        </Container>
    );
}

const Container = styled(FullBlockDiv)``;
