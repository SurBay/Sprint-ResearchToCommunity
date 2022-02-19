import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useVoteDetailContext } from "./Vote__DetailProvider";
import { FlexCenteringDiv } from "../../../Style";

export default function VoteDetailOthers() {
    const { prevVote, nextVote } = useVoteDetailContext();

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
                <Link to={`/vote/${prevVote._id}`}>
                    <OtherVoteTitle>{prevVote.title}</OtherVoteTitle>
                </Link>
            </OtherVoteRow>
            <OtherVoteRow>
                <OtherVoteTag>다음</OtherVoteTag>
                <Link to={`/vote/${nextVote._id}`}>
                    <OtherVoteTitle>{nextVote.title}</OtherVoteTitle>
                </Link>
            </OtherVoteRow>
        </VoteDetailOtherContainer>
    );
}

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
