import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AppProvider from "./AppProvider";
import Alert from "../Page/Alert";
import VoteDetail from "../Page/VoteDetail";
import { FullPage } from "../Style";
import { kakaoInitialize } from "../Util/kakao";
import { isUserConnectOnMobile } from "../Util/environment";

export function App() {
    const [connectOnMobile, setConnectOnMobile] = useState<boolean>(true);

    useEffect(() => {
        kakaoInitialize();
        if (!isUserConnectOnMobile()) {
            setConnectOnMobile(false);
        }

        return;
    }, []);

    if (!connectOnMobile) {
        return (
            <Container>
                <Alert />
            </Container>
        );
    }

    return (
        <AppProvider>
            <Container>
                <VoteDetail />
            </Container>
        </AppProvider>
    );
}

const Container = styled(FullPage)``;
