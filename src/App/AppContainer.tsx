import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppContext } from "./AppProvider";
import styled from "styled-components";
import { InvalidAddressAlert, NonMobileConnectionAlert } from "../Page/Alert";
import VoteList from "../Page/Vote/Vote_List";
import VoteDetail from "../Page/Vote/Vote__Detail";
import { KakaoOatuhRedirect } from "../Page/Auth";
import { FullPage } from "../Style";

export default function AppContainer() {
    const { connectOnMobile } = useAppContext();

    return (
        <BrowserRouter>
            <Container>
                {connectOnMobile ? (
                    <MainRouter />
                ) : (
                    <NonMobileConnectionAlert />
                )}
            </Container>
        </BrowserRouter>
    );
}

function MainRouter() {
    return (
        <>
            <Routes>
                <Route path="/" element={<VoteList />} />
                <Route path="/vote/:id" element={<VoteDetail />} />
                <Route path="/kakao-oauth" element={<KakaoOatuhRedirect />} />
                <Route path="/*" element={<InvalidAddressAlert />} />
            </Routes>
        </>
    );
}

const Container = styled(FullPage)``;
