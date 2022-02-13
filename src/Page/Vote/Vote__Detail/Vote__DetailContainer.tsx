import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../App/AppProvider";
import { useVoteDetailContext } from "./Vote__DetailProvider";
import VoteDetailSelectOption from "./Component/Vote__Detail__SelectOption";
import {
    FullBlockHeaderPageDiv,
    FlexCenteringDiv,
    FlexSpaceBetweenDiv,
    StylelessButton,
} from "../../../Style";

import { PollProp } from "../../../Type";

export default function VoteDetailContainer() {
    return (
        <Container>
            <VoteDetailHeader />
            <VoteDetailBody />
            <VoteDetailFooter />
            <VoteDetailOther />
        </Container>
    );
}

const Scroll = styled.div`
    overflow-y: auto;
`;

// Header 부분 (작성자 정보, 공유하기 버튼)
function VoteDetailHeader() {
    const { vote } = useVoteDetailContext();
    return (
        <VoteDetailHeaderContainer>
            <VoteAuthorProfileContainer>
                <div>작성자 사진</div>
                <span>{vote?.author}</span>
            </VoteAuthorProfileContainer>
            <div>공유하기</div>
        </VoteDetailHeaderContainer>
    );
}
// Body 부분 (투표 제목, 투표 내용, 참여기간, 선택지, 선택 버튼)
function VoteDetailBody() {
    const { setModalType } = useAppContext();
    const { vote } = useVoteDetailContext();

    return (
        <VoteDetailBodyContainer>
            <VoteTitle>{vote?.title}</VoteTitle>
            <br />
            <VoteContent>{vote?.content}</VoteContent>
            <br />
            <VoteDurationTitle>참여기간</VoteDurationTitle>
            <VoteDurationDate>2022.02.06 ~ 2022.02.13</VoteDurationDate>
            {vote?.polls.map((poll, index) => {
                return (
                    <VoteDetailSelectOption
                        key={`${index}:${poll.content}`}
                        poll={poll}
                    />
                );
            })}
            <VoteSubmitButtonRow>
                <VoteSubmitButton
                    onClick={() => {
                        setModalType("REQUEST_KAKAO_OR_EMAIL");
                    }}
                >
                    투표하기
                </VoteSubmitButton>
            </VoteSubmitButtonRow>
        </VoteDetailBodyContainer>
    );
}

// Body__선택지 부분
// Vote__Detail__SelectOption.tsx 참조

// Footer 부분 (참여인원/좋아요)
function VoteDetailFooter() {
    return (
        <VoteDetailFooterContainer>
            <VoteParticipatesDiv>체크 10명 참여</VoteParticipatesDiv>
            <VoteLikesDiv>별표 12</VoteLikesDiv>
        </VoteDetailFooterContainer>
    );
}

// 다른 투표 둘러보기
function VoteDetailOther() {
    return (
        <VoteDetailOtherContainer>
            <SeeOtherVoteText>다른 투표 둘러보기</SeeOtherVoteText>
            <OtherVoteRow>
                <OtherVoteHotTag>HOT</OtherVoteHotTag>
                <OtherVoteTitle>
                    눈치게임: 남들이 가장 적게 고를 것 같은 숫자는?
                </OtherVoteTitle>
            </OtherVoteRow>
            <OtherVoteRow>
                <OtherVoteTag>이전</OtherVoteTag>
                <OtherVoteTitle>
                    뭐가 더 드러운 것 같아요? 아침에 샤워하기 vs 저녁에 샤워하기{" "}
                </OtherVoteTitle>
            </OtherVoteRow>
            <OtherVoteRow>
                <OtherVoteTag>다음</OtherVoteTag>
                <OtherVoteTitle>(다음 글이 없습니다)</OtherVoteTitle>
            </OtherVoteRow>
        </VoteDetailOtherContainer>
    );
}

const Container = styled(FullBlockHeaderPageDiv)``;

// Header 부분
const VoteDetailHeaderContainer = styled(FlexSpaceBetweenDiv)`
    height: 60px;
    padding: 0px 12px;
    margin-bottom: 40px;
`;

const VoteAuthorProfileContainer = styled(FlexCenteringDiv)``;

// Body 부분
const VoteDetailBodyContainer = styled.div`
    display: block;
    padding: 0px 12px;
    margin-bottom: 25px;
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

const VoteAllowDuplicateCheckText = styled.span``;

// Body__선택지 부분

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
    justify-content: space-between;
    align-items: center;
    padding: 0px 15px;
    margin-bottom: 45px;
`;

const VoteParticipatesDiv = styled.div``;

const VoteLikesDiv = styled.div``;

// 다른 투표 둘러보기 ~
const VoteDetailOtherContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0px 15px;
    gap: 10px;
`;

const SeeOtherVoteText = styled.span`
    font-size: 16px;
    line-height: 40px;
`;

const OtherVoteRow = styled(FlexCenteringDiv)`
    justify-content: flex-start;
    width: 100%;
    height: 30px;
`;

const OtherVoteTag = styled(FlexCenteringDiv)`
    width: 70px;
    height: 100%;
`;

const OtherVoteHotTag = styled(OtherVoteTag)`
    color: white;
    background-color: ${(props) => props.theme.hotTagColor};
    border-radius: 15px;
`;

const OtherVoteTitle = styled(FlexCenteringDiv)`
    justify-content: flex-start;
    max-width: calc(100% - 70px);
    padding: 0px 12px;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
