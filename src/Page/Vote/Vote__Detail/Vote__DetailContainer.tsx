import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAppContext } from "../../../App/AppProvider";
import { useVoteDetailContext } from "./Vote__DetailProvider";
import VoteDetailSelect from "./Component/Vote__Detail__Select";
import VoteDetailResult from "./Component/Vote__Detail__Result";
import { hasAlreadyVoted } from "../../../Util";
import {
    FullBlockHeaderPageDiv,
    FlexCenteringDiv,
    FlexSpaceBetweenDiv,
} from "../../../Style";
import { useNavigate } from "react-router-dom";

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

// Header 부분 (작성자 정보, 공유하기 버튼)
function VoteDetailHeader() {
    const { selectedVote } = useAppContext();
    return (
        <VoteDetailHeaderContainer>
            <VoteAuthorProfileContainer>
                <div>작성자 사진</div>
                <span>{selectedVote.author}</span>
            </VoteAuthorProfileContainer>
            <div>공유하기</div>
        </VoteDetailHeaderContainer>
    );
}
// Body 부분 (투표 제목, 투표 내용, 참여기간, 선택지, 선택 버튼)
function VoteDetailBody() {
    const { tempUserInfo, selectedVote } = useAppContext();
    const [alreadyVoted, setAlreadyVoted] = useState<boolean>(false);

    useEffect(() => {
        if (hasAlreadyVoted(tempUserInfo, selectedVote._id)) {
            setAlreadyVoted(true);
        }
        return;
    }, [tempUserInfo, selectedVote]);

    return (
        <VoteDetailBodyContainer>
            <VoteTitle>{selectedVote.title}</VoteTitle>
            <br />
            <VoteContent>{selectedVote.content}</VoteContent>
            <br />
            <VoteDurationTitle>참여기간</VoteDurationTitle>
            <VoteDurationDate>2022.02.06 ~ 2022.02.13</VoteDurationDate>
            {alreadyVoted ? <VoteDetailResult /> : <VoteDetailSelect />}
        </VoteDetailBodyContainer>
    );
}

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
    const navigate = useNavigate();
    const { adjoiningVotes } = useVoteDetailContext();
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
                <OtherVoteTitle
                    onClick={() => {
                        if (adjoiningVotes[0]._id) {
                            navigate("/vote", { state: adjoiningVotes[0]._id });
                        }
                    }}
                >
                    {adjoiningVotes[0].title}
                </OtherVoteTitle>
            </OtherVoteRow>
            <OtherVoteRow>
                <OtherVoteTag>다음</OtherVoteTag>
                <OtherVoteTitle
                    onClick={() => {
                        if (adjoiningVotes[1]._id) {
                            navigate("/vote", { state: adjoiningVotes[1]._id });
                        }
                    }}
                >
                    {adjoiningVotes[1].title}
                </OtherVoteTitle>
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
    cursor: pointer;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
