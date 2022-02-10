import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useVoteDetailContext } from "./Vote__DetailProvider";
import {
    FullBlockPage,
    FlexCenteringDiv,
    FlexSpaceBetweenDiv,
    StylelessButton,
} from "../../../Style";

export default function VoteDetailContainer() {
    return (
        <Container>
            <VoteDetailHeader />
            <VoteDetailBody />
            <VoteDetailFooter />
            <VoteDetailOther />
            <Link to={"/"}>홈으로</Link>
        </Container>
    );
}

// Header 부분 (작성자 정보, 공유하기 버튼)
function VoteDetailHeader() {
    return (
        <VoteDetailHeaderContainer>
            <VoteAuthorProfileContainer>
                <div>작성자 사진</div>
                <span>작성자 명</span>
            </VoteAuthorProfileContainer>
            <div>공유하기</div>
        </VoteDetailHeaderContainer>
    );
}
// Body 부분 (투표 제목, 투표 내용, 참여기간, 선택지, 선택 버튼)
function VoteDetailBody() {
    const { vote } = useVoteDetailContext();

    return (
        <VoteDetailBodyContainer>
            <VoteTitle>{vote?.title}</VoteTitle>
            <br />
            <VoteContent>{vote?.content}</VoteContent>
            <br />
            <VoteDurationTitle>참여기간</VoteDurationTitle>
            <VoteDurationDate>2022.02.06 ~ 2022.02.13</VoteDurationDate>
            <VoteOption />
            <VoteOption />
            <VoteOption />
            <VoteSubmitButtonRow>
                <VoteSubmitButton>투표하기</VoteSubmitButton>
            </VoteSubmitButtonRow>
        </VoteDetailBodyContainer>
    );
}

// Body__선택지 부분
function VoteOption() {
    return (
        <VoteOptionContainer>
            <VoteOptionTitle>집고양이로 살기</VoteOptionTitle>
            <VoteOptionSelected>(대충 체크 표시)</VoteOptionSelected>
        </VoteOptionContainer>
    );
}

// Footer 부분 (참여인원/스크랩 여부)
function VoteDetailFooter() {
    return (
        <VoteDetailFooterContainer>
            <div></div>
            <div></div>
        </VoteDetailFooterContainer>
    );
}

// 다른 투표 둘러보기 ~
function VoteDetailOther() {
    return (
        <VoteDetailOtherContainer>
            <div></div>
            <div></div>
        </VoteDetailOtherContainer>
    );
}

const Container = styled(FullBlockPage)``;

// Header 부분
const VoteDetailHeaderContainer = styled(FlexSpaceBetweenDiv)`
    height: 60px;
    border: 2px solid blue;
    padding: 0px 12px;
`;

const VoteAuthorProfileContainer = styled(FlexCenteringDiv)``;

// Body 부분
const VoteDetailBodyContainer = styled.div`
    display: block;
    padding: 0px 12px;
`;

const VoteTitle = styled.span`
    font-size: 4.5vw;
    line-height: 7vw;
`;

const VoteContent = styled.span`
    font-size: 3.7vw;
    line-height: 6vw;
`;

const VoteDurationTitle = styled.span`
    font-size: 3vw;
    line-height: 50px;
`;

const VoteDurationDate = styled.span`
    font-size: 2.8vw;
`;

// Body__선택지 부분
const VoteOptionContainer = styled(FlexSpaceBetweenDiv)`
    width: 94%;
    height: 50px;
    border: 1px solid gray;
    border-radius: 25px;
    padding: 0px 15px;
    margin: 10px auto;
    cursor: pointer;
`;

const VoteOptionTitle = styled.span``;

const VoteOptionSelected = styled.div``;

const VoteSubmitButtonRow = styled(FlexCenteringDiv)``;

const VoteSubmitButton = styled(StylelessButton)`
    width: 94%;
    height: 60px;
    color: white;
    background-color: ${(props) => props.theme.voteButtonBackgroundColor};
    border-radius: 12px;
    margin: auto;
`;

// Footer 부분
const VoteDetailFooterContainer = styled.div`
    display: flex;
`;

// 다른 투표 둘러보기 ~
const VoteDetailOtherContainer = styled.div`
    display: flex;
`;
