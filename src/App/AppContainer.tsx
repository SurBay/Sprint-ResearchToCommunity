import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppContext } from "./AppProvider";
import styled from "styled-components";
import Alert from "../Page/Alert";
import VoteDetail from "../Page/VoteDetail";
import { KakaoOatuhRedirect } from "../Auth";
import { FullPage } from "../Style";

export default function AppContainer() {
    const { connectOnMobile } = useAppContext();

    return (
        <BrowserRouter>
            <Container>
                {connectOnMobile ? <MainRouter /> : <Alert />}
            </Container>
        </BrowserRouter>
    );
}

function MainRouter() {
    return (
        <>
            <Routes>
                <Route path="/" element={<VoteDetail />} />
                <Route path="/kakao-oauth" element={<KakaoOatuhRedirect />} />
                <Route path="/*" element={<>This address is not available</>} />
            </Routes>
        </>
    );
}

const Container = styled(FullPage)``;
