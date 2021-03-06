import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ReactGA from "react-ga";
import { isUserConnectOnIOS } from "../../../Util";
import {
    FlexCenteringDiv,
    FullBlockDiv,
    StylelessLink,
    StylelessButton,
    SvgIcon,
    ClickableSvgIcon,
} from "../../../Style";
import CloseIcon from "../../../Resource/svg/close-icon.svg";
import VoteCreatePageImg from "../../../Resource/svg/vote-create-page-img.svg";

export default function VoteCreate() {
    return (
        <Container>
            <SvgIcon src={VoteCreatePageImg} width={"100%"} />
            <Cover />
            <InfoMessage />
        </Container>
    );
}

function InfoMessage() {
    const navigate = useNavigate();

    return (
        <InfoMessageContainer>
            <CloseIconRow>
                <IconWrapper
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    <ClickableSvgIcon src={CloseIcon} width={"6vw"} />
                </IconWrapper>
            </CloseIconRow>
            <InfoTextRow>
                <InfoMessageText>{`게시글 작성은`}&nbsp;</InfoMessageText>
                <InfoMessageSurBayAppText>{`SurBay 앱`}</InfoMessageSurBayAppText>
                <InfoMessageText>{`에서만 가능합니다.`}</InfoMessageText>
            </InfoTextRow>
            <div
                onClick={() => {
                    ReactGA.event({
                        category: "Download",
                        action: "Push App Download Link",
                    });
                }}
            >
                <a
                    href={
                        isUserConnectOnIOS()
                            ? "https://surbay.page.link/naxz"
                            : "https://surbay.page.link/ZCg5"
                    }
                    style={{ textDecoration: "none" }}
                >
                    <AppDownloadButton>Download</AppDownloadButton>
                </a>
            </div>
        </InfoMessageContainer>
    );
}

const Container = styled(FullBlockDiv)`
    position: relative;
    padding-top: 180px;
    overflow: hidden;
`;

const Cover = styled.div`
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.2;
`;

const InfoMessageContainer = styled.div`
    position: absolute;
    top: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 150px;
    background-color: white;
    padding: 10px 15px;
    animation: slideDown 1s ease;
    @keyframes slideDown {
        0% {
            transform: translateY(-150px);
        }
        100% {
            transform: translateY(0px);
        }
    }
`;

const IconWrapper = styled.div``;

const CloseIconRow = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-bottom: 20px;
`;

const InfoTextRow = styled(FlexCenteringDiv)`
    width: 100%;
    margin-bottom: 30px;
`;

const InfoMessageText = styled.span`
    font-size: 4vw;
`;

const InfoMessageSurBayAppText = styled(InfoMessageText)`
    color: ${(props) => props.theme.color.mainTheme};
`;

const AppDownloadButton = styled(StylelessButton)`
    font-size: 4vw;
    color: white;
    background-color: ${(props) => props.theme.color.mainTheme};
    text-decoration: none;
    padding: 5px 18px;
    border-radius: 15px;
`;
